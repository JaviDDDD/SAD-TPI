# Etapa 1: Compilar Angular
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY ng/ ./
RUN npm install
RUN npm run build

# Etapa 2: Compilar Backend
FROM node:20 AS backend-build
WORKDIR /app/backend
COPY srv/package*.json ./
RUN npm install
COPY srv/ ./
RUN npm run build

# Etapa final: solo Node.js
FROM node:20-slim
WORKDIR /app

# Backend
COPY --from=backend-build /app/backend/dist ./dist
COPY --from=backend-build /app/backend/node_modules ./node_modules
COPY --from=backend-build /app/backend/package*.json ./

# Frontend compilado (Angular)
COPY --from=frontend-build /app/frontend/dist/ng/browser ./dist/public

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/src/index.js"]
