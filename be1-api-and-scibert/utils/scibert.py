from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModel
import torch
from data.bert_config import config
from scipy.spatial.distance import cosine

MODEL_NAME = config["huggingface_pretrained_nlp_model"]
MAX_LENGTH = config["MAX_LENGTH"]


# Load SciBERT model and tokenizer once during application startup
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

model = AutoModel.from_pretrained(MODEL_NAME)

# # Load classification model (only if you have a fine-tuned checkpoint)
# try:
#     model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)
# except:
#     print("Warning: The model is not fine-tuned for classification. Consider using a fine-tuned checkpoint.")

# Load SciBERT for embeddings
embedding_model = AutoModel.from_pretrained(MODEL_NAME)

# Move models to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
embedding_model.to(device)


"""
Generate SciBERT embeddings from text.
Parameters:
    text (str): The input text (abstract/full text).
Returns:
    torch.Tensor: SciBERT embeddings (vector representation of the paper).
"""
def generate_embeddings(text: str):
    if not isinstance(text, str) or not text.strip():  # Check for empty string
        raise ValueError(f"Invalid input for tokenization: {repr(text)}")  

    # Tokenize the text
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512).to(device)

    # Get embeddings from AutoModel (not AutoModelForSequenceClassification)
    with torch.no_grad():
        outputs = embedding_model(**inputs)

    # Extract CLS token embedding
    embeddings = outputs.last_hidden_state[:, 0, :].squeeze()
    return embeddings




"""
Calculate the cosine similarity between two embeddings.
Parameters:
    embedding1: embedding
    embedding2: embedding
Returns:
    int: cosine similarity value
"""
def calculate_cosine_similarity(embedding1, embedding2):

    return 1 - cosine(embedding1.cpu().numpy(), embedding2.cpu().numpy())

"""
Tokenize input text using SciBERT tokenizer.
Parameters:
    text (str): The input text.
Returns:
    dict: Tokenized text.
"""
def tokenize_text(text: str):
    return tokenizer(
        text,  # No need to wrap in a list
        padding="max_length",
        truncation=True,
        max_length=MAX_LENGTH,
        return_tensors="pt"
    )