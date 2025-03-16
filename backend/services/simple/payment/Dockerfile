# Use Python base image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application, including firebase_credentials.json
COPY . .

EXPOSE 5002

# Run the application
CMD ["python", "app.py"]