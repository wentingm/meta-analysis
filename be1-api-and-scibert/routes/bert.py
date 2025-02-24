from fastapi import APIRouter
from controllers.bert import (
    predict_text_controller,
    predict_text_batch_controller
)
from data import bert_config
from models.pico_request import PICORequest, PICORequest2


THRESHOLD = bert_config.config["similarity_score_threshold"]

bert_api = APIRouter()


# Get a classification and similarity score with PICO and paper data
@bert_api.post("/predict")
def predict_text_router(data: PICORequest):
    return predict_text_controller(data)

# Get a list of classifications and similarity scores with PICO and paper data list
@bert_api.post("/predict-batch")
def predict_text_batch_router(data: PICORequest2):
    return predict_text_batch_controller(data)