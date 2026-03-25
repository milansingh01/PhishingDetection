import os
from transformers import pipeline

# 1. Setup paths
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.abspath(os.path.join(current_dir, "..", "models", "phishing_model"))

if not os.path.exists(model_path):
    raise FileNotFoundError(f"Could not find model at {model_path}")

# 2. Initialize the AI
classifier = pipeline(
    "text-classification",
    model=model_path,
    tokenizer=model_path
)

def analyze_input(content, input_type):
    result = classifier(content)
    
    if isinstance(result, list) and len(result) > 0:
        prediction = result[0]
        raw_score = prediction['score']
        
        # Format for the user
        confidence_pct = f"{round(raw_score * 100, 2)}%"
        label = "Phishing" if prediction['label'] == "phishing" else "Safe"

        return {
            "label": label,
            "confidence": confidence_pct,
            "score": raw_score,      # <--- ADD THIS LINE
            "raw_score": raw_score,  # (Keeping this too just in case)
            "explanation": f"Analysis complete with {confidence_pct} confidence."
        }
    
    return {"label": "Error", "score": 0.0}