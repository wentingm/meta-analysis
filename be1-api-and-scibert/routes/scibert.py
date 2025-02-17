from fastapi import APIRouter, HTTPException
from controllers.scibert import (
    infer_text_controller,
    infer_text_batch_controller
)

scibert_api = APIRouter()


@scibert_api.post("/infer")
def infer_text_router(data: dict | str):  # Accepts either JSON (dict) or plain text (str)
    if not data:
        raise HTTPException(status_code=400, detail="Data is required.")
    return infer_text_controller(data)


@scibert_api.post("/infer-batch")
def infer_text_batch_router(data_list: list):
    if not isinstance(data_list, list) or not data_list:
        raise HTTPException(status_code=400, detail="Expected a list of data.")
    return infer_text_batch_controller(data_list)