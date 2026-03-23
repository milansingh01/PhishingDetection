from jose import jwt, JWTError
from datetime import datetime, timedelta

# SECRET KEY (keep this secret in real systems)
SECRET_KEY = "supersecretkey123"

# Algorithm used for encoding
ALGORITHM = "HS256"

# Token expiry time
ACCESS_TOKEN_EXPIRE_MINUTES = 60


# 🔐 Create token
def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


# 🔍 Verify token
def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None