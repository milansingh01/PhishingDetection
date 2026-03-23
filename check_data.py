from backend.db.database import SessionLocal
from backend.db.models import Employee

db = SessionLocal()

users = db.query(Employee).all()

for u in users:
    print(u.email, u.role)

db.close()