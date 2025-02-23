# Use official Node.js image for building
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app
COPY . .

# Build the frontend
RUN npm run build

# Use nginx to serve the frontend
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose frontend port (default Nginx port)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
