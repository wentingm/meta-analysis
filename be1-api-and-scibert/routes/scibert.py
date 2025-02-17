from fastapi import APIRouter
from controllers.scibert import (
    infer_text_controller,
    infer_text_batch_controller
)
from data import scibert_config
from utils.standard import extract_text_from_pico


THRESHOLD = scibert_config.config["similarity_score_threshold"]

scibert_api = APIRouter()

# Get a classification and similarity score with PICO and paper data
@scibert_api.post("/infer")
def infer_text_router(pop: str, inter: str, comp: str, outcome: str, paper_data: str, THRESHOLD=0.65):  # Accepts either JSON (dict) or plain text (str)
    pico_sentence = extract_text_from_pico(pop, inter, comp, outcome)
    return infer_text_controller(pico_sentence, paper_data, THRESHOLD)

# Get a list of classifications and similarity scores with PICO and paper data list
@scibert_api.post("/infer-batch")
def infer_text_batch_router(pop: str, inter: str, comp: str, outcome: str, data_list: list, THRESHOLD=0.65):
    pico_sentence = extract_text_from_pico(pop, inter, comp, outcome)
    return infer_text_batch_controller(pico_sentence, data_list, THRESHOLD)