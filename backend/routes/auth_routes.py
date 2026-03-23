from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.auth import authenticate_user
from backend.utils.jwt_utils import create_access_token

# 🔥 THIS NAME MUST BE EXACT
router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(req: LoginRequest):

    user = authenticate_user(req.email, req.password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "email": user["email"],
        "role": user["role"]
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }