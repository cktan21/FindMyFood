# Stage 1: Build the frontend assets
FROM node:18-alpine AS build
WORKDIR /app
# Copy only package files first to leverage Docker cache
COPY package*.json ./
RUN npm install
# Copy the rest of the code
COPY . .
# Ensure any pre-existing dist folder is removed
RUN rm -rf dist
# Build the application (the build output is typically in the "dist" folder)
RUN npm run build

# Stage 2: Serve the assets with Nginx
FROM nginx:alpine
# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*
# Copy the build output from the previous stage to Nginx’s html directory
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
