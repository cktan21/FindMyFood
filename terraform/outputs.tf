output "cluster_name" {
  value = google_container_cluster.primary.name
}

output "frontend_bucket_url" {
  value = google_storage_bucket.frontend_bucket.url
}

output "frontend_lb_ip" {
  value = google_compute_global_address.frontend_ip.address
}
