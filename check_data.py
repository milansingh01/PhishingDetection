from backend.db.database import SessionLocal
from backend.db.models import User
from backend.db.fraud_models import FraudAnalyst
from backend.db.fraud_models import Scan

db = SessionLocal()

users = db.query(User).all()
fraud_analysts=db.query(FraudAnalyst).all()
scans=db.query(Scan).all()

for u in users:
    print(u.email, u.role)
for f in fraud_analysts:
    print(f.email)

for m in scans:
    print(f"Scan ID: {m.id} | User: {m.employee_name} | Email: {m.email_id} | Time: {m.timestamp}")
db.close()

