resource "google_container_cluster" "primary" {
  name     = var.cluster_name
  location = var.zone

  # Remove the default node pool so we can define our own.
  remove_default_node_pool = true

  initial_node_count = 1

  node_config {
    machine_type = "e2-medium"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }
}

resource "google_container_node_pool" "primary_nodes" {
  cluster  = google_container_cluster.primary.name
  location = google_container_cluster.primary.location
  name     = "default-pool"

  node_config {
    machine_type = "e2-medium"
    disk_size_gb = 20
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }

  initial_node_count = 1
}
