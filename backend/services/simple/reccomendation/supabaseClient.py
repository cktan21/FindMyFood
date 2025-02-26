from supabase import create_client, Client
import os

class SupabaseClient:
    def __init__(self):
        self.url = os.getenv("SUPABASE_URL")
        self.key = os.getenv("SUPABASE_API_KEY")
        self.client: Client = create_client(self.url, self.key)

    def insert_recommendation(self, rec):
        response = self.client.table("Recommendations").insert({
            "order_id": rec.order_id,
            "recommendation": rec.recommendation
        }).execute()
        return response

    def fetch_recommendation(self, id):
        response = self.client.table("Recommendations").select("*").eq("id", id).execute()
        data = response.data
        return data[0] if data else None
