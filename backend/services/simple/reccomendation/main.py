from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict
from supabaseClient import SupabaseClient
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Simplified Recommendation Service")
supabase = SupabaseClient()

class Recommendation(BaseModel):
    id: int
    recommendations: Dict[str, str]

@app.get("/")
def read_root():
    return {"message": "Recommendation Service is running 🚀"}

@app.post("/recommendation")
def create_recommendation(rec: Recommendation):
    response = supabase.insert_recommendation(rec)
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to store recommendation.")
    return {"message": "Recommendation stored successfully", "data": rec}

@app.get("/recommendation/{id}")
def get_recommendation(id: int):
    recommendation = supabase.fetch_recommendation(id)
    if not recommendation:
        raise HTTPException(status_code=404, detail="Recommendation not found.")
    return recommendation
