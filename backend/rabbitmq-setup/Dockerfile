FROM python:3.10

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application, including firebase_credentials.json
COPY . .

# Run the application
CMD ["python", "amqp_setup.py"]