# routes/scibert_routes.py
from fastapi import APIRouter
from models.scibert import infer_scibert

# Create a router for SciBERT
router = APIRouter()

# Define SciBERT inference endpoint
@router.post("/infer/")
async def infer_text(text: str):
    result = infer_scibert(text)
    return result