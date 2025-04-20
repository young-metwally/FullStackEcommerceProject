# Use the official Node.js image as the build environment
FROM node:16-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if exists) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the React application
RUN npm run build

# Use the official NGINX image to serve the built app
FROM nginx:alpine

# Copy the built app from the 'build' stage to NGINX's default static folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the app to be accessible
EXPOSE 80

# Start NGINX to serve the app
CMD ["nginx", "-g", "daemon off;"]
