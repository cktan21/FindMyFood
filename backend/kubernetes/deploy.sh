#!/bin/bash

# Step 1: Apply Namespace
kubectl apply -f kubernetes/namespace.yaml

# Step 2: Apply ConfigMaps
kubectl apply -f kubernetes/configmaps/ -n esd

# Step 3: Apply PersistentVolumeClaims
kubectl apply -f kubernetes/pvcs/ -n esd

# Step 4: Apply Services
kubectl apply -f kubernetes/services/ -n esd

# Step 5: Apply Deployments
kubectl apply -f kubernetes/deployments/ -n esd

# Step 6: Apply Jobs (like rabbitmq setup)
kubectl apply -f kubernetes/jobs/ -n esd

# Step 7: Install Argo CD
kubectl apply -n esd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Step 8: Apply Argo CD configurations
kubectl apply -f kubernetes/argocd/ -n esd

# Get Secrets (add this to GitHub Secrets)
echo "ArgoCD Initial Admin Password:"
kubectl get secret argocd-initial-admin-secret -n esd -o jsonpath="{.data.password}" | base64 -d && echo

# 9. Installing traefik (via Helm)
helm repo add traefik https://helm.traefik.io/traefik
helm repo update
helm install traefik traefik/traefik --namespace esd -f kubernetes/traefik/values-traefik.yaml
