import { PubSub } from '@google-cloud/pubsub';
import { EVENTS } from './events';

const pubsub = new PubSub();

export const publishMessage = async (event: EVENTS, data: any) => {
  const dataBuffer = Buffer.from(JSON.stringify(data));
  await pubsub.topic(event).publishMessage({ data: dataBuffer });
};
