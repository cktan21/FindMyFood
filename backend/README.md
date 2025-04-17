# Backend Microservice Architecture
```bash
tree -a -I 'node_modules|__pycache__|venv|.git|.idea|*.pyc|*.log' -L 3
```
```bash
docker-compose up -d --build
docker-compose down
```
```bash
# 1. Namespace
kubectl apply -f kubernetes/namespace.yaml

# 2. Secrets + ConfigMaps
kubectl apply -f kubernetes/configmaps/ -n esd

# 3. PersistentVolumeClaims
kubectl apply -f kubernetes/pvcs/ -n esd

# 4. Services
kubectl apply -f kubernetes/services/ -n esd

# 5. Deployments
kubectl apply -f kubernetes/deployments/ -n esd

# 6. Jobs (like rabbitmq setup)
kubectl apply -f kubernetes/jobs/ -n esd

# 7. Argo CD
kubectl apply -f kubernetes/argocd/ -n esd

kubectl get svc -n esd
kubectl get pods -n esd -o wide
kubectl get nodes -n esd -o wide
```