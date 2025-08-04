# Build the frontend with Vite
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy source files
COPY . .

# Install dependencies and build the app
RUN npm install
RUN npm run build

# Serve with Nginx
FROM nginx:alpine

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config (must exist in same folder as this Dockerfile)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
