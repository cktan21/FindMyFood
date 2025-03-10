# Use Scratch Image --> static binaries that have no external dependencies
FROM scratch

# Set working directory
WORKDIR /queue

# # Copy and install dependencies
# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose port 8008
EXPOSE 8008

# Run the application
CMD ["queue.exe"]
