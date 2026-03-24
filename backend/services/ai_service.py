import os
from transformers import pipeline

# 1. Get the absolute path to the directory this file is in (backend/services)
current_dir = os.path.dirname(os.path.abspath(__file__))

# 2. Go up one level to 'backend', then into 'models/phishing_model'
# This creates a path Windows actually understands: M:\PhishingDetection\backend\models\phishing_model
model_path = os.path.abspath(os.path.join(current_dir, "..", "models", "phishing_model"))

# 3. Double-check the folder exists before loading (optional but helpful)
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Could not find model at {model_path}")

classifier = pipeline(
    "text-classification",
    model=model_path,
    tokenizer=model_path
)

def analyze_input(content, input_type):
    result = classifier(content)[0]
    return {
        "label": result["label"],
        "score": str(round(result["score"] * 100, 2)) + "%"
    }