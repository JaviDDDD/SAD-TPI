# Etapa 1: Build con Node 20
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Servir contenido estático compilado con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/ng/browser/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
