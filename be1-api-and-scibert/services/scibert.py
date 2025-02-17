from utils.scibert import generate_embeddings, calculate_cosine_similarity
import numpy as np


"""
Classifies the paper based on the cosine similarity between the PICO sentence and paper text.
Parameters:
    pico_sentence (str): The PICO sentence to compare with the paper.
    paper_text (str): The text of the paper (abstract or full text).
    threshold (float): The similarity threshold for classification.
Returns:
    dict: Classification result with similarity score.
"""
def infer_text(pico_sentence: str, paper_text: str, threshold=0.65):
    # Generate embeddings for the PICO sentence and paper text
    pico_embedding = generate_embeddings(pico_sentence)
    paper_embedding = generate_embeddings(paper_text)
    
    # Calculate the cosine similarity
    similarity = calculate_cosine_similarity(pico_embedding, paper_embedding)
    
    # Convert similarity to a native Python float if it's a numpy.float32
    if isinstance(similarity, np.float32):
        similarity = float(similarity)
    
    # Classify based on threshold
    prediction = "Relevant" if similarity >= threshold else "Not Relevant"
    similarity_score = round(similarity, 4)
    
    return {
        "prediction": prediction,
        "similarity_score": similarity_score
    }
