from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from backend.db.database import Base

class FraudAnalyst(Base):
    __tablename__ = "fraud_analysts"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    employee_name = Column(String)    # For "EMPLOYEE"
    department = Column(String)       # For "DEPARTMENT"
    email_id = Column(String)         # For "EMAIL ID"
    fraud_status = Column(String)     # For "FRAUD STATUS" (Phishing/Safe)
    system_decision = Column(String)  # For "SYSTEM DECISION" (Flagged/Clean)
    human_verification = Column(String, default="Pending") # For "HUMAN VERIFICATION"
    timestamp = Column(DateTime(timezone=True), server_default=func.now())