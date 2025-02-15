# routes/scibert_routes.py
from fastapi import APIRouter
from models.scibert import infer_scibert, validate_params, tokenize_text, model
import torch
from concurrent.futures import ThreadPoolExecutor

executor = ThreadPoolExecutor(max_workers=4)


# Create a router for SciBERT
router = APIRouter()

# Define SciBERT inference endpoint
@router.post("/infer")
async def infer_text_controller(text: str):
    result = infer_scibert(text)
    return result

@router.post("/predict")
def predict_controller(text: str):
    inputs = tokenize_text([text])
    with torch.no_grad():
        outputs = model(**inputs)
    return {"embedding": outputs.last_hidden_state.tolist()}

@router.post("/predict-batch")
def predict_batch_controller(texts: list):
    results = list(executor.map(lambda text: predict(text), texts))
    return {"results": results}