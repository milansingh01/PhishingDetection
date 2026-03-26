from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from backend.db.database import get_db
from backend.db.fraud_crud import get_fraud_user, verify_password
from backend.utils.jwt_utils import create_access_token

# 1. Define the schema so FastAPI knows how to read the JSON body
class LoginRequest(BaseModel):
    email: str
    password: str

router = APIRouter(prefix="/fraud-auth", tags=["Fraud Auth"])

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    # 2. Access email/password from the request object
    user = get_fraud_user(db, request.email)

    if not user or not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # 3. Create the token with the 'fraud' type flag
    token = create_access_token({"sub": user.email, "type": "fraud"})
    
    return {
        "access_token": token, 
        "token_type": "bearer"
    }