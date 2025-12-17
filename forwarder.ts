import 'dotenv/config';
import { PubSub } from '@google-cloud/pubsub';
import { EVENTS } from './src/messaging/events';

// Base URL común para todos los endpoints
const baseUrl = process.env.BASE_URL ?? 'http://localhost:8000';

// Diccionario de topics: cada topic tiene su subscription name y endpoint
const topicsConfig: Record<string, { subscription: string; endpoint: string }> =
  {
    [EVENTS.CUSTOMER_UPSERTED]: {
      subscription: 'customer-upserted-sub',
      endpoint: '/events/accounts/customers/upserted'
    },
    [EVENTS.PROVIDER_UPSERTED]: {
      subscription: 'provider-upserted-sub',
      endpoint: '/events/accounts/providers/upserted'
    },
    [EVENTS.CONTRACTS_MAPPED]: {
      subscription: 'contracts-mapped-sub',
      endpoint: '/events/contracts/mapped'
    }
  };

const pubsub = new PubSub(); // usa PUBSUB_EMULATOR_HOST si está seteada
const MAX_RETRIES = 3;
// Map para rastrear los reintentos por messageId
const retryCounts = new Map<string, number>();

async function ensureTopicExists(topicName: string): Promise<void> {
  const topic = pubsub.topic(topicName);
  const [exists] = await topic.exists();

  if (!exists) {
    await topic.create();
    console.log(`✅ Topic "${topicName}" creado`);
  } else {
    console.log(`ℹ️  Topic "${topicName}" ya existe`);
  }
}

async function ensureSubscriptionExists(
  topicName: string,
  subName: string
): Promise<void> {
  const subscription = pubsub.subscription(subName);
  const [exists] = await subscription.exists();

  if (!exists) {
    const topic = pubsub.topic(topicName);
    await topic.createSubscription(subName);
    console.log(
      `✅ Subscription "${subName}" creada para topic "${topicName}"`
    );
  } else {
    console.log(`ℹ️  Subscription "${subName}" ya existe`);
  }
}

async function setupSubscription(
  topicName: string,
  subName: string,
  endpoint: string
) {
  // Asegurar que el topic y la subscription existan
  await ensureTopicExists(topicName);
  await ensureSubscriptionExists(topicName, subName);

  const subscription = pubsub.subscription(subName);
  const targetUrl = `${baseUrl}${endpoint}`;

  subscription.on('message', async (message) => {
    const messageId = message.id;
    try {
      // Obtener el contador de reintentos
      const retryCount = retryCounts.get(messageId) || 0;

      // Si se excedió el límite de reintentos, hacer ack y descartar el mensaje
      if (retryCount >= MAX_RETRIES) {
        console.error(
          `[${topicName}] Mensaje ${messageId} descartado después de ${retryCount} reintentos`
        );
        retryCounts.delete(messageId); // Limpiar el contador
        message.ack(); // Acknowledge para que no se reintente más
        return;
      }

      const dataStr = message.data ? message.data.toString('utf8') : '';
      const body = {
        message: {
          data: Buffer.from(dataStr, 'utf8').toString('base64'),
          attributes: message.attributes ?? {},
          messageId: message.id,
          publishTime: message.publishTime?.toISOString?.() ?? undefined
        },
        subscription: subName
      };

      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarder': 'local-pubsub'
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        const newRetryCount = retryCount + 1;
        console.error(
          `[${topicName}] HTTP error (intento ${newRetryCount}/${MAX_RETRIES}):`,
          res.status,
          text
        );

        // Incrementar el contador de reintentos
        retryCounts.set(messageId, newRetryCount);
        message.nack();
        return;
      }

      // Éxito: limpiar el contador y hacer ack del mensaje
      retryCounts.delete(messageId);
      message.ack();
    } catch (err) {
      const retryCount = retryCounts.get(messageId) || 0;
      const newRetryCount = retryCount + 1;

      if (newRetryCount >= MAX_RETRIES) {
        console.error(
          `[${topicName}] Mensaje ${messageId} descartado después de ${newRetryCount} reintentos. Error:`,
          err
        );
        retryCounts.delete(messageId);
        message.ack(); // Acknowledge para que no se reintente más
        return;
      }

      console.error(
        `[${topicName}] Forwarder error (intento ${newRetryCount}/${MAX_RETRIES}):`,
        err
      );
      retryCounts.set(messageId, newRetryCount);
      message.nack();
    }
  });

  subscription.on('error', (err) =>
    console.error(`[${topicName}] Subscription error:`, err)
  );

  console.log(`Forwarding ${topicName} (${subName}) -> ${targetUrl}`);
}

async function main() {
  console.log('🚀 Iniciando forwarder de PubSub...\n');
  console.log(`📍 Base URL: ${baseUrl}\n`);

  // Configurar suscripciones para todos los topics
  const promises = Object.entries(topicsConfig).map(([topicName, config]) =>
    setupSubscription(topicName, config.subscription, config.endpoint)
  );

  await Promise.all(promises);
  console.log(
    `\n✅ ${Object.keys(topicsConfig).length} subscription(s) configured y escuchando mensajes`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
