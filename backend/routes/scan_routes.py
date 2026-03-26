from fastapi import APIRouter, Depends, UploadFile, File, Form, Request
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.db.models import Scan
from backend.services.ai_service import analyze_input

router = APIRouter()

# 🔥 IMPORTANT FIX (prevents model crash)
MAX_INPUT_LENGTH = 1000


@router.post("/predict")
async def predict_scan(
    request: Request,
    db: Session = Depends(get_db),
    file: UploadFile = File(None),
    content: str = Form(None),
    type: str = Form(None)
):
    """
    Handles BOTH:
    1. JSON requests (email, url, text)
    2. FormData requests (attachments)
    """

    try:
        # 🔥 HANDLE BOTH JSON + FORM DATA
        if request.headers.get("content-type", "").startswith("application/json"):
            data = await request.json()
            content = data.get("content", "")
            input_type = data.get("type", "text")
        else:
            input_type = type or "text"

            if file:
                file_bytes = await file.read()

                # ✅ FIX 1: SAFE DECODE (prevents Unicode crash)
                content = file_bytes.decode("utf-8", errors="ignore")

                # fallback if still empty
                if not content.strip():
                    content = "Binary file uploaded (no readable text)"
            else:
                content = content or ""

        # ✅ FIX 2: LIMIT INPUT SIZE (prevents BERT crash)
        if content:
            content = content[:MAX_INPUT_LENGTH]

        # 🔥 RUN AI MODEL
        ai_result = analyze_input(content, input_type)

        raw_confidence = ai_result.get("score", 0.5)
        label = ai_result.get("label", "Safe")

        # 🔥 RISK CALCULATION
        if label == "Phishing":
            risk_value = int(85 + (raw_confidence * 12)) if raw_confidence > 0.9 else int(raw_confidence * 100)
        else:
            risk_value = int((1 - raw_confidence) * 15) if raw_confidence > 0.9 else int((1 - raw_confidence) * 100)

        risk_value = max(2, min(99, risk_value))

        # 🔥 REASONS
        reasons = []

        if label == "Phishing":
            if raw_confidence > 0.95:
                reasons.append(f"High-confidence match with known {input_type.lower()} phishing patterns.")
            else:
                reasons.append(f"Content deviates from safe {input_type.lower()} patterns.")

            reasons.append("AI detected social engineering indicators.")
        else:
            reasons.append(f"Content appears safe for {input_type.lower()}.")
            if raw_confidence < 0.7:
                reasons.append("Minor anomalies detected.")

        # 🔥 MULTI-SIGNAL SYSTEM
        signals = {
            "url": 0,
            "text": 0,
            "attachment": 0,
            "voice": 0
        }

        input_lower = input_type.lower()

        if input_lower == "url":
            signals["url"] = risk_value
            signals["text"] = int(risk_value * 0.7)

        elif input_lower == "email content":
            signals["text"] = risk_value
            signals["url"] = int(risk_value * 0.6)

        elif input_lower == "attachment":
            signals["attachment"] = risk_value
            signals["text"] = int(risk_value * 0.5)

        elif input_lower == "audio":
            signals["voice"] = risk_value
            signals["text"] = int(risk_value * 0.4)

        else:
            signals["text"] = risk_value

        # 🔥 SAVE TO DB
        new_scan = Scan(
            user_id=1,
            input_type=input_type,
            content=content,
            result=label,
            risk_score=str(risk_value)
        )
        db.add(new_scan)
        db.commit()

        # 🔥 FINAL RESPONSE
        return {
            "risk_score": risk_value,
            "status": label,
            "fraud_type": label,
            "confidence": raw_confidence,
            "signals": signals,
            "reasons": reasons,
            "action": ai_result.get("explanation", "Proceed with caution.")
        }

    except Exception as e:
        print("🔥 ERROR:", str(e))

        return {
            "risk_score": 0,
            "status": "Error",
            "reasons": ["System failed to process input safely."],
            "action": "Try smaller input or different file."
        }


@router.get("/history/{user_id}")
def history(user_id: int, db: Session = Depends(get_db)):
    return db.query(Scan).filter(Scan.user_id == user_id).all()