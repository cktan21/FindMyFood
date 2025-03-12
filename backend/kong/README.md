## Instructions

1. Ensure all docker containers are running before opening Kong
```bash
  docker-compose up -d --build
```

2. To test if Kong is working, try out the following urls to test routes
```bash
curl -i http://localhost:8001
curl -i http://localhost:8000/menu
curl -i http://localhost:8000/reccomendation
curl -i http://localhost:8000/chatgpt
curl -i http://localhost:8000/reccomend-food
```

3. To access Kong Admin GUI, go to http://localhost:8002







