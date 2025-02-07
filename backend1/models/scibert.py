# models/scibert.py
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Load SciBERT model and tokenizer once during application startup
MODEL_NAME = "allenai/scibert_scivocab_uncased"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

# Move model to GPU if available (optional)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def infer_scibert(text: str):
    try:
        # Tokenize the input text
        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)

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

