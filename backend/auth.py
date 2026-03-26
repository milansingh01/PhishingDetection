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
        # 🔥 FIX: We check if it's 'username' or 'name' or just use the email prefix
        # This prevents the 'no attribute username' crash
        display_name = getattr(user, 'username', getattr(user, 'name', email.split('@')[0]))
        
        return {
            "email": user.email,
            "role": getattr(user, 'role', 'Employee'),
            "username": display_name,
            "name": display_name
        }

    return None