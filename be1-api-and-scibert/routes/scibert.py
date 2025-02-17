from fastapi import APIRouter
from controllers.scibert import (
    infer_text_controller,
    infer_text_batch_controller
)
from data import scibert_config
from models.pico_request import PICORequest, PICORequest2


THRESHOLD = scibert_config.config["similarity_score_threshold"]

scibert_api = APIRouter()


# Get a classification and similarity score with PICO and paper data
@scibert_api.post("/infer")
def infer_text_router(data: PICORequest):
    return infer_text_controller(data)

# Get a list of classifications and similarity scores with PICO and paper data list
@scibert_api.post("/infer-batch")
def infer_text_batch_router(data: PICORequest2):
    return infer_text_batch_controller(data)