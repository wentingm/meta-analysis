from services.scibert import infer_text
from fastapi import HTTPException
from utils.standard import extract_text_from_dict
from utils.scibert import get_embeddings


"""
Classifies scientific papers based on metadata or plain text.
Args:
    data: string or JSON
Returns:
    text
"""
def infer_text_controller(data):
    if isinstance(data, dict):  # Metadata JSON
        text = extract_text_from_dict(data)
    elif isinstance(data, str):  # Plain text
        text = data
    else:
        raise HTTPException(status_code=400, detail="Invalid input. Expected JSON or string.")

    if not text:
        raise HTTPException(status_code=400, detail="No valid text found in metadata.")

    return infer_text(text)


"""
Generates SciBERT embeddings from metadata or plain text.
Args:
    data: string or JSON
Returns:
    text
"""
def get_embeddings_controller(data):
    if isinstance(data, dict):  # Metadata JSON
        text = extract_text_from_dict(data)
    elif isinstance(data, str):  # Plain text
        text = data
    else:
        raise HTTPException(status_code=400, detail="Invalid input. Expected JSON or string.")

    if not text:
        raise HTTPException(status_code=400, detail="No valid text found in metadata.")

    return get_embeddings(text).tolist()

"""
Processes multiple metadata JSONs in batch mode.
Args:
    List[data]: List of strings/JSONs
Returns:
    List of texts
"""
def infer_text_batch_controller(data_list: list):
    if not isinstance(data_list, list) or not data_list:
        raise HTTPException(status_code=400, detail="Invalid input. Expected a list of metadata JSONs.")

    results = []
    for data in data_list:
        try:
            results.append(infer_text_controller(data))
        except Exception as e:
            results.append({"error": str(e)})

    return results