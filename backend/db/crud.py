from backend.db.models import Employee

def get_employee_by_email(db, email):
    return db.query(Employee).filter(Employee.email == email).first()