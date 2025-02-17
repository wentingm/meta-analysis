from utils.scibert import model, device, tokenize_text, torch, F


"""
Perform inference to classify a paper (Relevant/Not Relevant).
Parameters:
    text (str): The input text (abstract/full text).
Returns:
    dict: Classification result (Relevant/Not Relevant) with confidence scores.
"""
def infer_text(text: str):
    try:
        inputs = tokenize_text(text)

        # Move input tensors to the same device as the model
        inputs = {key: value.to(device) for key, value in inputs.items()}

        with torch.no_grad():
            outputs = model(**inputs)

        # Get the logits (raw scores)
        logits = outputs.logits

        # Apply softmax to get probabilities
        probs = F.softmax(logits, dim=-1)

        # Get the predicted class (0 = Not Relevant, 1 = Relevant)
        prediction = torch.argmax(probs, dim=-1).item()
        confidence = probs[0, prediction].item()

        return {
            "prediction": "Relevant" if prediction == 1 else "Not Relevant",
            "confidence": round(confidence, 4),
        }

    except Exception as e:
        return {"error": str(e)}