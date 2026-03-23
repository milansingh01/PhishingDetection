from backend.db.database import SessionLocal
from backend.db.models import Employee

db = SessionLocal()

users = [
    {"email": "milan@barclays.com", "password": "pass123", "role": "analyst"},
    {"email": "rahul@barclays.com", "password": "pass123", "role": "admin"},
    {"email": "saakshi@barclays.com", "password": "pass345", "role": "analyst"}
]

for user in users:
    exists = db.query(Employee).filter_by(email=user["email"]).first()

    if not exists:
        db.add(Employee(**user))
        print(f"Added: {user['email']}")
    else:
        print(f"Already exists: {user['email']}")

db.commit()
db.close()