# Use Node.js image to build the app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Svelte app
RUN npm run build

# Use a lightweight web server to serve the built app
FROM nginx:alpine

# Copy the built app to Nginx’s serving directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]