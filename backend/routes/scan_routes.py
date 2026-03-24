from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.db.models import Scan
from backend.services.ai_service import analyze_input

router = APIRouter()

@router.post("/scan")
def scan(data: dict, db: Session = Depends(get_db)):

    result = analyze_input(data["content"], data["type"])

    new_scan = Scan(
        user_id=data["user_id"],
        input_type=data["type"],
        content=data["content"],
        result=result["label"],
        risk_score=result["score"]
    )

    db.add(new_scan)
    db.commit()

    return result


@router.get("/history/{user_id}")
def history(user_id: int, db: Session = Depends(get_db)):
    return db.query(Scan).filter(Scan.user_id == user_id).all()