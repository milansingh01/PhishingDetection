from sqlalchemy.orm import Session
from backend.db.fraud_models import FraudAnalyst


def get_fraud_user(db: Session, email: str):
    return db.query(FraudAnalyst).filter(FraudAnalyst.email == email).first()

def verify_password(plain_password: str, stored_password: str):
    return plain_password == stored_password