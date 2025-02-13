# models/scibert.py
from transformers import AutoTokenizer, AutoModel
import torch

# Load SciBERT model and tokenizer once during application startup
MODEL_NAME = "allenai/scibert_scivocab_uncased"
BATCH_SIZE = 8
MAX_LENGTH = 512
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModel.from_pretrained(MODEL_NAME)

# Move model to GPU if available (optional)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def infer_scibert(text: str):
    try:
        # Tokenize the input text
        inputs = tokenize_text(text)

        # Move input tensors to the same device as the model
        inputs = {key: value.to(device) for key, value in inputs.items()}

        # Perform inference without updating gradients
        with torch.no_grad():
            outputs = model(**inputs)

        # Get the class with the highest score (argmax)
        prediction = outputs.logits.argmax().item()

        return {"prediction": prediction}

    except Exception as e:
        return {"error": str(e)}

def validate_params(batch_size, max_length):
    assert batch_size > 0, "Batch size must be positive"
    assert 0 < max_length <= 512, "Sequence length must be between 1 and 512"

def tokenize_text(texts):
    return tokenizer(
        texts, 
        padding="max_length", 
        truncation=True, 
        max_length=MAX_LENGTH, 
        return_tensors="pt"
    )


validate_params(BATCH_SIZE, MAX_LENGTH)