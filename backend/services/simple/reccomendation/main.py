from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from supabaseClient import SupabaseClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI and Supabase
app = FastAPI(title="Simplified Recommendation Service")
supabase = SupabaseClient()

# Pydantic model for incoming recommendations
class Recommendation(BaseModel):
    order_id: int
    recommendation: str

@app.get("/")
def read_root():
    return {"message": "Recommendation Service is running 🚀"}

@app.post("/recommendation")
def create_recommendation(rec: Recommendation):
    response = supabase.insert_recommendation(rec)
    if response.get("status_code") != 201:
        raise HTTPException(status_code=500, detail="Failed to store recommendation.")
    return {"message": "Recommendation stored successfully", "data": rec}

@app.get("/recommendation/{order_id}")
def get_recommendation(order_id: int):
    recommendation = supabase.fetch_recommendation(order_id)
    if not recommendation:
        raise HTTPException(status_code=404, detail="Recommendation not found.")
    return recommendation
