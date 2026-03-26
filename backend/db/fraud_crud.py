from sqlalchemy.orm import Session
from backend.db.fraud_models import FraudAnalyst
from backend.db.fraud_models import Scan


def get_fraud_user(db: Session, email: str):
    return db.query(FraudAnalyst).filter(FraudAnalyst.email == email).first()

def verify_password(plain_password: str, stored_password: str):
    return plain_password == stored_password
def create_scan_record(db: Session, employee_data: dict, ai_result: dict):
    """
    Successfully handles 3 arguments: db, user info, and ai results.
    """
    new_scan = Scan(
        employee_name=employee_data.get("name"),
        department=employee_data.get("department"),
        email_id=employee_data.get("email"),
        fraud_status=ai_result.get("label"),
        # We pull the risk_score we calculated in the route
        system_decision="Flagged" if ai_result.get("label") == "Phishing" else "Clean",
        human_verification="Pending"
    )
    db.add(new_scan)
    db.commit()
    db.refresh(new_scan)
    return new_scan