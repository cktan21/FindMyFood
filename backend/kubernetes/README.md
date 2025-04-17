## Kubernetes Setup

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

# 7. Install Argo CD
kubectl apply -n esd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 8. Argo CD
kubectl apply -f kubernetes/argocd/ -n esd

# Get Secrets => add this to Github Secrets
kubectl get secret argocd-initial-admin-secret -n esd -o jsonpath="{.data.password}" | base64 -d && echo

# Expose Ingress
kubectl expose deployment kong --type=LoadBalancer --name=kong-deployment -n esd
kubectl expose deployment socketio --type=LoadBalancer --name=socketio-deployment -n esd
kubectl expose deployment argocd-server --type=LoadBalancer --name=argocd-server -n esd

# Checking
kubectl get svc -n esd
kubectl get pods -n esd -o wide
kubectl get nodes -n esd -o wide
```