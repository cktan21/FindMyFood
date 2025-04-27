# Use Python base image
FROM python:3.14-rc-slim-bookworm

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose port (assuming FastAPI runs on 8000)
EXPOSE 4000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4000"]
