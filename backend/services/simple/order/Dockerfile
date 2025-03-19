# Use Bun's official base image
FROM oven/bun:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and bun.lock first (for better caching)
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the entire project (excluding ignored files)
COPY . .

# Expose the application port
EXPOSE 6369

# Run the Bun server
CMD ["bun", "run", "index.ts"]
