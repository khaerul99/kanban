# Tahap 1: Build
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Tahap 2: Production (Nginx)
FROM nginx:stable-alpine
# Copy hasil build ke folder default Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# PENTING: Buka port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]