from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.db.models import Scan
from backend.services.ai_service import analyze_input

router = APIRouter()

@router.post("/scan")
def scan(data: dict, db: Session = Depends(get_db)):
    # 1. Get AI result
    ai_result = analyze_input(data["content"], data.get("type", "text"))
    
    # 2. Save to DB using the correct column names from your models.py
    new_scan = Scan(
        user_id=data.get("user_id", 1),
        input_type=data.get("type", "text"), # Matches your 'input_type' column
        content=data["content"],
        result=ai_result["label"],
        risk_score=str(ai_result["score"])   # Matches your 'risk_score' column
    )
    
    db.add(new_scan)
    db.commit()

    return {
        "status": "success", 
        "prediction": ai_result["label"], 
        "confidence": ai_result["confidence"]
    }

@router.get("/history/{user_id}")
def history(user_id: int, db: Session = Depends(get_db)):
    return db.query(Scan).filter(Scan.user_id == user_id).all()