#!/bin/bash

# Set your Docker Hub username
DOCKER_HUB_USERNAME="thykp"

# Docker login
echo "🔐 Logging in to Docker Hub..."
docker login || { echo "❌ Docker login failed."; exit 1; }

# Paths to service folders with Dockerfiles
SERVICE_PATHS=(
  "./services/simple"
  "./services/complex"
)

# Loop through nested service folders
for BASE_PATH in "${SERVICE_PATHS[@]}"; do
  for DIR in "$BASE_PATH"/*; do
    if [ -d "$DIR" ] && [ -f "$DIR/Dockerfile" ]; then
      SERVICE_NAME=$(basename "$DIR")
      IMAGE_NAME="$DOCKER_HUB_USERNAME/$SERVICE_NAME:latest"

      echo "🐳 Building image for $SERVICE_NAME..."
      docker build -t "$SERVICE_NAME" "$DIR"

      echo "🏷 Tagging image as $IMAGE_NAME"
      docker tag "$SERVICE_NAME:latest" "$IMAGE_NAME"

      echo "📤 Pushing image to Docker Hub..."
      docker push "$IMAGE_NAME"

      echo "✅ Done: $SERVICE_NAME"
      echo "---------------------------"
    fi
  done
done

# Handle root-level folders (e.g. socket.io, rabbitmq)
ROOT_SERVICES=(
  "./socket.io"
  "./rabbitmq"
)

for DIR in "${ROOT_SERVICES[@]}"; do
  if [ -d "$DIR" ] && [ -f "$DIR/Dockerfile" ]; then
    SERVICE_NAME=$(basename "$DIR")
    IMAGE_NAME="$DOCKER_HUB_USERNAME/$SERVICE_NAME:latest"

    echo "🐳 Building image for $SERVICE_NAME..."
    docker build -t "$SERVICE_NAME" "$DIR"

    echo "🏷 Tagging image as $IMAGE_NAME"
    docker tag "$SERVICE_NAME:latest" "$IMAGE_NAME"

    echo "📤 Pushing image to Docker Hub..."
    docker push "$IMAGE_NAME"

    echo "✅ Done: $SERVICE_NAME"
    echo "---------------------------"
  fi
done

echo "🎉 All custom services pushed to Docker Hub under user: $DOCKER_HUB_USERNAME"
