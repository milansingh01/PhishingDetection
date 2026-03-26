from fastapi import APIRouter, Depends, UploadFile, File, Form, Request
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.services.ai_service import analyze_input
from backend.db.fraud_crud import create_scan_record
import traceback

router = APIRouter()

@router.post("/predict")
async def predict_scan(
    request: Request,
    db: Session = Depends(get_db),
    file: UploadFile = File(None),
    content: str = Form(None),
    type: str = Form("email"),
    # 🔥 No more hardcoded defaults here! 
    employee_name: str = Form(None),
    employee_email: str = Form(None),
    department: str = Form(None)
):
    try:
        # 1. Handle JSON vs Form Data
        if request.headers.get("content-type", "").startswith("application/json"):
            data = await request.json()
            content = data.get("content", "")
            input_type = data.get("type", "email")
            user_n = data.get("employee_name")
            user_e = data.get("employee_email")
            user_d = data.get("department")
        else:
            input_type = type or "email"
            if file:
                file_bytes = await file.read()
                content = file_bytes.decode("utf-8", errors="ignore")
            content = content or ""
            user_n = employee_name
            user_e = employee_email
            user_d = department

        # 2. Safety Check: Ensure we actually got the user data
        if not user_n or not user_e:
            print("⚠️ WARNING: Frontend did not send user details!")

        # 3. Run AI Model
        ai_res = analyze_input(content[:1000], input_type.lower())
        label = ai_res.get("label", "Safe")
        conf = ai_res.get("score", 0.5)

        # 4. Risk Calculation
        risk_value = int(85 + (conf * 12)) if label == "Phishing" else int((1 - conf) * 15)
        risk_value = max(5, min(98, risk_value))

        # 5. Mapping Signals (Fixes the 0% bars)
        signals = {"url": 0, "text": 0, "attachment": 0, "voice": 0}
        cat = input_type.lower()
        if "url" in cat: signals["url"] = risk_value
        elif "attachment" in cat: signals["attachment"] = risk_value
        else: signals["text"] = risk_value

        # 6. 🔥 SAVE TO DB (Dynamic Data Only)
        user_info = {"name": user_n, "email": user_e, "department": user_d}
        create_scan_record(db, user_info, {"label": label, "risk_score": risk_value})

        return {
            "risk_score": risk_value,
            "status": label,
            "confidence": conf,
            "signals": signals,
            "reasons": ai_res.get("reasons", ["Pattern analysis complete"]),
            "action": ai_res.get("explanation", "Proceed with caution")
        }

    except Exception as e:
        traceback.print_exc()
        return {"status": "Error", "risk_score": 0}
@router.get("/history/{email_id}")
def get_user_history(email_id: str, db: Session = Depends(get_db)):
    from backend.db.fraud_models import Scan
    return db.query(Scan).filter(Scan.email_id == email_id).order_by(Scan.timestamp.desc()).all()