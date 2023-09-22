FROM nginx:stable-alpine

# Environment variables
ARG VITE_BACKEND_BASE_URL
ENV VITE_BACKEND_BASE_URL=${VITE_BACKEND_BASE_URL}

ARG VITE_BACKEND_BASE_URL_LOCAL
ENV VITE_BACKEND_BASE_URL_LOCAL=${VITE_BACKEND_BASE_URL_LOCAL}

# Install pnpm
RUN apk add --update nodejs npm && npm install -g pnpm

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build
COPY . .
RUN pnpm run build

# Copy build and config to nginx
RUN cp -r /app/build/* /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
