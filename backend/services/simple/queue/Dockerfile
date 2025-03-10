# Dockerised deno from 
FROM denoland/deno:2.2.3

# Set working directory
WORKDIR /app

# Copy your source code
COPY . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.js

# Expose the application port
EXPOSE 8008

# Run the application
CMD ["deno", "run", "-A", "main.js"]