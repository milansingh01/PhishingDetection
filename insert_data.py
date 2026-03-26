from backend.db.database import SessionLocal
from backend.db.models import User
from backend.db.fraud_models import FraudAnalyst

db = SessionLocal()

users = [
    {"email": "milan@barclays.com", "password": "pass123", "role": "analyst"},
    {"email": "rahul@barclays.com", "password": "pass123", "role": "admin"},
    {"email": "saakshi@barclays.com", "password": "pass345", "role": "analyst"},
    {"email": "pragya@barclays.com", "password": "pass321", "role": "HR"}
]
fraud_analysts = [
    {"email": "milan@barclays.com", "password": "pass123"},
    {"email": "saakshi@barclays.com", "password" :"pass345"}
        ]
for user in users:
    exists = db.query(User).filter_by(email=user["email"]).first()
    if not exists:
        db.add(User(**user))
        print(f"Added: {user['email']}")
    else:
        print(f"Already exists: {user['email']}")

for fr in fraud_analysts:
    exists =db.query(FraudAnalyst).filter_by(email=fr["email"]).first()
    if not exists:
        db.add(FraudAnalyst(**fr))
        print(f"Added: {fr['email']}")
    else:
        print(f"Already exists: {fr['email']}")

db.commit()
db.close()