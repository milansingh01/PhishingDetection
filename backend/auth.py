from backend.utils.regex_utils import is_valid_barclays_email
from backend.db.database import SessionLocal
from backend.db.crud import get_employee_by_email

def authenticate_user(email, password):

    if not is_valid_barclays_email(email):
        return None

    db = SessionLocal()

    user = get_employee_by_email(db, email)

    db.close()

    if user and user.password == password:
        return {
            "email": user.email,
            "role": user.role,
            "password": user.password
        }

    return None