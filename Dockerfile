# Dockerfile para Next.js en Cloud Run
FROM node:20-alpine AS base

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Instalar dependencias
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
# Copiar pnpm-workspace.yaml solo si existe
COPY pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

# Build de la aplicación
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard/overview
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard/overview

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=${NEXT_PUBLIC_CLERK_SIGN_IN_URL}
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=${NEXT_PUBLIC_CLERK_SIGN_UP_URL}
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=${NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=${NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}" > .env.production && \
    echo "NEXT_PUBLIC_CLERK_SIGN_IN_URL=${NEXT_PUBLIC_CLERK_SIGN_IN_URL}" >> .env.production && \
    echo "NEXT_PUBLIC_CLERK_SIGN_UP_URL=${NEXT_PUBLIC_CLERK_SIGN_UP_URL}" >> .env.production && \
    echo "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=${NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}" >> .env.production && \
    echo "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=${NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}" >> .env.production

RUN echo "=== .env.production creado ===" && \
    if [ -f .env.production ]; then \
      echo "Archivo .env.production existe"; \
      echo "Contenido (primeras 100 chars):"; \
      head -c 100 .env.production; \
      echo ""; \
      if [ -n "$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" ]; then \
        echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY tiene valor: $(echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | cut -c1-20)..."; \
      else \
        echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY está VACÍA!"; \
      fi; \
    else \
      echo "ERROR: .env.production NO se creó"; \
    fi

RUN pnpm build
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public


COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 8080

ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

