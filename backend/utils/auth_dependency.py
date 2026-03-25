from fastapi import Header, Query, HTTPException, Depends
from backend.utils.jwt_utils import verify_access_token

def get_current_user(token: str = Query(None)):
    # Now Swagger will just show a normal text box for 'token'
    if not token:
        raise HTTPException(status_code=401, detail="Token missing")

    payload = verify_access_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return payload

def get_current_fraud_user(payload: dict = Depends(get_current_user)):
    """
    Checks if the verified JWT belongs to a Fraud Analyst.
    """
    if payload.get("type") != "fraud":
        raise HTTPException(status_code=403, detail="Not authorized as fraud analyst")

    return payload