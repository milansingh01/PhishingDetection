from backend.db.models import User

def get_employee_by_email(db, email):
    return db.query(User).filter(User.email == email).first()