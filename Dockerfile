# Build Stage #
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --omit=optional \
    && npm cache clean --force
# COPY app/ ./app
# RUN addgroup  -g  1000 appgroup && adduser -D -u 1000 -G appgroup appuser \
#     && chown -R 1000:1000 /app
COPY --chown=1000:1000 app/ ./app

# Runtime Stage #
FROM gcr.io/distroless/nodejs20-debian12
USER 1000:1000
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app /app
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
    CMD ["node", "-e", "const http=require('http');http.get('http://127.0.0.1:3000/health',res=>process.exit(res.statusCode===200?0:1)).on('error',()=>process.exit(1))" ]

CMD ["node", "app/server.js"]
