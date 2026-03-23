from sqlalchemy import Column, String
from backend.db.database import Base

class Employee(Base):
    __tablename__ = "employees"

    email = Column(String, primary_key=True, index=True)
    password = Column(String)
    role = Column(String)