# MAKE SURE TO CHANGE THE HOST IN THE BELLOW TWO FILES TO THE IP ADDRESS FOR TRAEFIK
kubectl apply -f kubernetes/traefik/ingress/kong-ingress.yaml
kubectl apply -f kubernetes/traefik/ingress/all-services-ingress.yaml

# Expose Ingress
kubectl expose deployment socketio --type=LoadBalancer --name=socketio-deployment -n esd
kubectl expose deployment argocd-server --type=LoadBalancer --name=argocd-server -n esd