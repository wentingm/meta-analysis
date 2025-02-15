from fastapi import APIRouter
from controllers import infer_text_controller, predict_controller, predict_batch_controller

scibert_api = APIRouter()


@scibert_api.get("/infer")
def infer_text_router(text: str):
  return infer_text_controller(text)

@scibert_api.get("/predict")
def predict_route(text: str):
  return predict_controller(text)

@scibert_api.get("/predict-batch")
def predict_batch_route(text: str):
  return predict_batch_controller(text)