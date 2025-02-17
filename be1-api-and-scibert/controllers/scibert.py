from services.scibert import infer_text
from fastapi import HTTPException
from utils.standard import extract_paper_data
from data.scibert_config import config


THRESHOLD = config["similarity_score_threshold"]

"""
Classifies scientific papers based on metadata or plain text: classification and similarity score.
Parameters:
    data: string or JSON
Returns:
    text
"""
def infer_text_controller(pico_sentence: str, paper_data: str, THRESHOLD=0.65):
    paper_text = extract_paper_data(paper_data)
    return infer_text(pico_sentence, paper_text, THRESHOLD)


"""
Processes multiple metadata JSONs in batch mode: classification and similarity score.
Parameters:
    data: string or JSON
Returns:
    List of texts
"""
def infer_text_batch_controller(pico_sentence: str, paper_data_list: list):
    if not isinstance(paper_data_list, list) or not paper_data_list:
        raise HTTPException(status_code=400, detail="Invalid input. Expected a list of metadata JSONs or texts.")

    results = []
    for paper_data in paper_data_list:
        try:
            paper_text = extract_paper_data(paper_data)
            results.append(infer_text_controller(pico_sentence, paper_text, THRESHOLD))
        except Exception as e:
            results.append({"error": str(e)})

    return results