resource "google_compute_backend_bucket" "frontend" {
  name        = "frontend-backend-bucket"
  bucket_name = google_storage_bucket.frontend_bucket.name
  enable_cdn  = true
}

resource "google_compute_url_map" "frontend" {
  name            = "frontend-url-map"
  default_service = google_compute_backend_bucket.frontend.self_link
}

resource "google_compute_target_http_proxy" "frontend" {
  name   = "frontend-http-proxy"
  url_map = google_compute_url_map.frontend.self_link
}

resource "google_compute_global_address" "frontend_ip" {
  name = "frontend-ip"
}

resource "google_compute_global_forwarding_rule" "frontend" {
  name        = "frontend-http-forwarding-rule"
  ip_address  = google_compute_global_address.frontend_ip.address
  ip_protocol = "TCP"
  port_range  = "80"
  target      = google_compute_target_http_proxy.frontend.self_link
}
