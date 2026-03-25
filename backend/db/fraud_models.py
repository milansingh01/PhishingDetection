from sqlalchemy import Column, Integer, String
from backend.db.database import Base

class FraudAnalyst(Base):
    __tablename__ = "fraud_analysts"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)