terraform {
  required_providers {
    neon = {
      source  = "kislerdm/neon"
    }
  }
}

provider "neon" {
  api_key = var.neon_api_key
}

variable "neon_api_key" {
  type      = string
  sensitive = true
}

resource "neon_project" "sad_tpi" {
  name           = "sad-tpi-project"
  region_id      = "aws-eu-central-1"
  store_password = "yes"
}

resource "neon_database" "sad_tpi_db" {
  name       = "sad-tpi"
  owner_name = neon_project.sad_tpi.database_user
  project_id = neon_project.sad_tpi.id
  branch_id  = neon_project.sad_tpi.default_branch_id
}

output "db_name" {
  value = neon_database.sad_tpi_db.name
}

output "db_user" {
  value = neon_project.sad_tpi.database_user
}

output "db_password" {
  value     = neon_project.sad_tpi.database_password
  sensitive = true
}

output "db_host" {
  value = neon_project.sad_tpi.database_host
}

output "connection_uri" {
  value     = neon_project.sad_tpi.connection_uri
  sensitive = true
}
