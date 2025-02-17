from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModel
import torch
import torch.nn.functional as F
from data.scibert_config import config

MODEL_NAME = config["huggingface_pretrained_nlp_model"]
MAX_LENGTH = config["MAX_LENGTH"]


# Load SciBERT model and tokenizer once during application startup
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

# Load classification model (only if you have a fine-tuned checkpoint)
try:
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)
except:
    print("Warning: The model is not fine-tuned for classification. Consider using a fine-tuned checkpoint.")

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
def get_embeddings(text: str):
    try:
        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=MAX_LENGTH)
        inputs = {key: value.to(device) for key, value in inputs.items()}  # Move to GPU if available

        with torch.no_grad():
            outputs = embedding_model(**inputs)

        return outputs.last_hidden_state.mean(dim=1)  # Average pooling

    except Exception as e:
        return {"error": str(e)}


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