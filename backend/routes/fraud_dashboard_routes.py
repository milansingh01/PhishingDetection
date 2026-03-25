from fastapi import APIRouter, Depends
from backend.utils.auth_dependency import get_current_fraud_user
from backend.services.fraud_service import generate_stats
from sqlalchemy.orm import Session
from backend.db.database import get_db

router = APIRouter(prefix="/fraud-dashboard", tags=["Fraud Dashboard"])

@router.get("/overview")
def dashboard(user=Depends(get_current_fraud_user)):
    return {
        "message": "Fraud Dashboard Loaded",
        "user": user
    }
@router.get("/stats")
def stats(user=Depends(get_current_fraud_user), db: Session = Depends(get_db)):
    # You MUST pass 'db' into the service function here
    return generate_stats(db)