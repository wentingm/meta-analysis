from sentence_transformers import SentenceTransformer, util, CrossEncoder
from data.bert_config import config
import torch
from torch.nn import functional as F
import re


# Check if GPU is available, if not use CPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load pre-trained Sentence-BERT model
model = SentenceTransformer(config["huggingface_pretrained_nlp_model"])
model = model.to(device)  # Move model to the chosen device

# Initialize cross-encoder model (only once)
cross_encoder = CrossEncoder(config["cross_encoder_type"], device=device)

MAX_LEN = config["MAX_LENGTH"]  # For Chunk sizing for splitting large texts


"""
Generate normalized embeddings using Sentence-BERT.
Parameters:
    text (str): Input text to encode.
Returns:
    Tensor: Normalized embedding tensor.
"""
def get_normalized_embedding(text):
    embedding = model.encode(text, convert_to_tensor=True)
    return F.normalize(embedding, p=2, dim=0)  # Changed dim to 0 for 1D tensors


"""
Classifies the paper based on the cosine similarity between the PICO sentence and paper text.
Parameters:
    pico_sentence (str): The PICO sentence to compare with the paper.
    paper_text (str): The text of the paper (abstract or full text).
    threshold (float): The similarity threshold for classification.
Returns:
    dict: Classification result with similarity score.
Comments:
    Less accurate, but faster.
"""
def predict_text(pico_sentence: str, paper_text: str, threshold=0.65):
    # Generate normalized embeddings for the PICO sentence and paper text
    pico_embedding = get_normalized_embedding(pico_sentence)
    paper_embedding = get_normalized_embedding(paper_text)

    # Calculate the cosine similarity
    similarity_score = util.cos_sim(pico_embedding, paper_embedding).item()
    similarity_score_formatted = round(similarity_score, 4)

    # Classify based on threshold
    binary_result = 1 if similarity_score_formatted >= threshold else 0

    return {
        "prediction": binary_result,
        "similarity_score": similarity_score_formatted
    }

"""
Classifies the paper using a Cross-Encoder by comparing the PICO sentence with each sentence in the paper.
Parameters:
    pico_sentence (str): The PICO sentence to compare with the paper.
    paper_text (str): The text of the paper (abstract or full text).
    threshold (float): The similarity threshold for classification.
Returns:
    dict: Classification result with the maximum similarity score.
Comments:
    More accurate, but more costly
"""
def predict_text_cross_encoder(pico_sentence: str, paper_text: str, threshold=0.65):
    # Split paper text into chunks based on punctuation
    # paper_chunks = split_text_into_chunks(paper_text, max_chunk_size=MAX_LEN)
    paper_chunks = re.split(r'(?<=[.!?]) +', paper_text)

    max_similarity = 0

    # Compare PICO sentence with each chunk
    for chunk in paper_chunks:
        # Get similarity score for the pair
        score = cross_encoder.predict([(pico_sentence, chunk)])
        
        # Convert to native Python float
        score_float = float(score[0])
        
        # Find the maximum similarity score
        max_similarity = max(max_similarity, score_float)

    # Classify based on the maximum similarity score
    binary_result = 1 if max_similarity >= threshold else 0

    return {
        "prediction": binary_result,
        "similarity_score": round(max_similarity, 4)
    }