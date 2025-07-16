# backend/Dockerfile
FROM node:18-alpine

RUN apk add --no-cache wget

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .


RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5000

# Simple health check using curl
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["npm", "start"]
