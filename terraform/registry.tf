resource "google_artifact_registry_repository" "repo" {
  project       = var.project_id
  location      = var.region
  repository_id = "my-repo"
  format        = "DOCKER"
  description   = "Artifact Registry for Docker images"
}
