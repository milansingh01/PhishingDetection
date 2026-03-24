from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="ealvaradob/bert-finetuned-phishing"
)

def analyze_input(content, input_type):
    result = classifier(content)[0]

    return {
        "label": result["label"],
        "score": str(round(result["score"] * 100, 2)) + "%"
    }