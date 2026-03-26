from fastapi import APIRouter, HTTPException, Body
from backend.auth import authenticate_user
from backend.utils.jwt_utils import create_access_token
# Fix the import that caused the SyntaxError
from backend.db.fraud_models import Scan 

router = APIRouter()

@router.post("/login")
def login(
    email: str = Body(..., embed=True), 
    password: str = Body(..., embed=True)
):
    """
    Using Body(..., embed=True) bypasses the Pydantic 'LoginSchema' error 
    entirely while still allowing Saakshi to log in from the frontend.
    """
    try:
        # 1. Authenticate user from your auth.py logic
        user = authenticate_user(email, password)

        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        # 2. Create the access token
        token = create_access_token({"sub": user["email"]})

        # 3. RETURN DYNAMIC DATA (No Hardcoding)
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "name": user.get("username") or user.get("name") or "Employee",
                "email": user.get("email"),
                "department": user.get("role") or user.get("department") or "General"
            }
        }
    except Exception as e:
        print(f"🔥 Login Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")