from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.db.fraud_crud import  get_fraud_user, verify_password
from backend.utils.jwt_utils import create_access_token

router = APIRouter(prefix="/fraud-auth", tags=["Fraud Auth"])

@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = get_fraud_user(db, email)

    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.email, "type": "fraud"})
    return {"access_token": token}