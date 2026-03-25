from backend.db.database import SessionLocal
from backend.db.models import User

db = SessionLocal()

users = db.query(User).all()

for u in users:
    print(u.email, u.role)

db.close()