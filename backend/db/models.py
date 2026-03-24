from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from backend.db.database import Base

class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    input_type = Column(String)
    content = Column(String)
    result = Column(String)
    risk_score = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class Employee(Base):
    __tablename__ = "employees"

    email = Column(String, primary_key=True, index=True)
    password = Column(String)
    role = Column(String)