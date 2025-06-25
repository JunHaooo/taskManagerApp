# Step 1: Node container builds the React app
FROM node:18 AS builder
WORKDIR /app
COPY . .

# Accept build arg and set environment variable for Vite
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm install
ENV NODE_ENV=production
#ENV VITE_API_URL=http://backend:8080
RUN npm run build -- --mode production

# Step 2: Copy the finished build to nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
