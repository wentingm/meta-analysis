from sentence_transformers import SentenceTransformer, util

# Load pre-trained Sentence-BERT model
model = SentenceTransformer('all-MiniLM-L6-v2')

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
    pico_embedding = model.encode(pico_sentence, convert_to_tensor=True)
    paper_embedding = model.encode(paper_text, convert_to_tensor=True)
    
    # Debug: Check if embeddings are generated
    print(f"PICO embedding: {pico_embedding[:5]}...")  # Print first few elements
    print(f"Paper embedding: {paper_embedding[:5]}...")  # Print first few elements

    # Calculate the cosine similarity
    similarity_score = util.pytorch_cos_sim(pico_embedding, paper_embedding)
    
    # Debug: Check the similarity score tensor
    print(f"Similarity score tensor: {similarity_score}")

    if similarity_score is None or similarity_score.size() == (0, 0):
        print("Error: Similarity score is empty!")
        return {}

    similarity_score_float = similarity_score.item()  # Convert tensor to float
    similarity_score_formatted = round(similarity_score_float, 4)  # Round to 4 decimal places
    
    # Debug: Print the similarity score
    print(f"Similarity score (float): {similarity_score_formatted}")

    # Classify based on threshold
    binary_result = 1 if similarity_score_formatted >= threshold else 0

    return {
        "prediction": binary_result,
        "similarity_score": similarity_score_formatted  # Return the formatted similarity score
    }







####### SciBERT - not accurate #######

# from utils.scibert import generate_embeddings, calculate_cosine_similarity
# import numpy as np


# """
# Classifies the paper based on the cosine similarity between the PICO sentence and paper text.
# Parameters:
#     pico_sentence (str): The PICO sentence to compare with the paper.
#     paper_text (str): The text of the paper (abstract or full text).
#     threshold (float): The similarity threshold for classification.
# Returns:
#     dict: Classification result with similarity score.
# """
# def infer_text(pico_sentence: str, paper_text: str, threshold=0.65):
#     # Generate embeddings for the PICO sentence and paper text
#     pico_embedding = generate_embeddings(pico_sentence)
#     paper_embedding = generate_embeddings(paper_text)
    
#     # Calculate the cosine similarity
#     similarity = calculate_cosine_similarity(pico_embedding, paper_embedding)
    
#     # Convert similarity to a native Python float if it's a numpy.float32
#     if isinstance(similarity, np.float32):
#         similarity = float(similarity)
    
#     # Classify based on threshold
#     prediction = "Relevant" if similarity >= threshold else "Not Relevant"
#     similarity_score = round(similarity, 4)
    
#     return {
#         "prediction": prediction,
#         "similarity_score": similarity_score
#     }
