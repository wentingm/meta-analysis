from services.bert import predict_text, predict_text_cross_encoder
from fastapi import HTTPException
from utils.standard import extract_paper_data
from data.bert_config import config
from utils.standard import extract_text_from_pico
from models.pico_request import PICORequest, PICORequest2


THRESHOLD = config["similarity_score_threshold"]

"""
Classifies scientific papers based on metadata or plain text: classification and similarity score.
Parameters:
    data: string or JSON
Returns:
    text
"""
def predict_text_controller(data: PICORequest):
    if not isinstance(data.pico_dict, dict) or not data.pico_dict:
        raise HTTPException(status_code=400, detail="pico_dict - Invalid input. Expected a JSON.")

    pico_sentence = extract_text_from_pico(data.pico_dict)
    paper_text = extract_paper_data(data.paper_data)

    return predict_text_cross_encoder(pico_sentence, paper_text, THRESHOLD)


"""
Processes multiple metadata JSONs in batch mode: classification and similarity score.
Parameters:
    data: string or JSON
Returns:
    List of texts
"""
def predict_text_batch_controller(data: PICORequest2):
    if not isinstance(data.paper_data_list, list) or not data.paper_data_list:
        raise HTTPException(status_code=400, detail="paper_data_list - Invalid input. Expected a list of metadata JSONs or texts.")

    if not isinstance(data.pico_dict, dict) or not data.pico_dict:
        raise HTTPException(status_code=400, detail="pico_dict - Invalid input. Expected a JSON.")

    results = []
    for paper_data in data.paper_data_list:
        try:
            pico_sentence = extract_text_from_pico(data.pico_dict)
            paper_text = extract_paper_data(paper_data)
            results.append(predict_text(pico_sentence, paper_text, THRESHOLD))
        except Exception as e:
            results.append({"error": str(e)})

    return results