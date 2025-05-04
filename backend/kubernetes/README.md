## Kubernetes Setup

### Automated Deployement (use WSL or Mac)

```bash
chmod +x deploy.sh
./deploy.sh
```

### Manual Deployement

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

# 9. Installing traefik (via Helm)
helm repo add traefik https://helm.traefik.io/traefik
helm repo update
helm install traefik traefik/traefik --namespace esd -f kubernetes/traefik/values-traefik.yaml

kubectl apply -f kubernetes/traefik/kong-ingress.yaml
kubectl apply -f kubernetes/traefik/ingress/ingress-all-services.yaml

# Expose Remaining Ingress
kubectl expose deployment socketio --type=LoadBalancer --name=socketio-deployment -n esd
kubectl expose deployment argocd-server --type=LoadBalancer --name=argocd-server -n esd

# Checking
kubectl get svc -n esd
kubectl get pods -n esd -o wide
kubectl get nodes -n esd -o wide
```