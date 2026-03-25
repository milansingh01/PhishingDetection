from backend.db.database import SessionLocal
from backend.db.models import User
from backend.db.fraud_models import FraudAnalyst

db = SessionLocal()

users = db.query(User).all()
fraud_analysts=db.query(FraudAnalyst).all()

for u in users:
    print(u.email, u.role)
for f in fraud_analysts:
    print(f.email)
db.close()