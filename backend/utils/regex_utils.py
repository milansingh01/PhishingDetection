import re

BARCLAYS_EMAIL_PATTERN = re.compile(
    r"^[a-zA-Z0-9._%+-]+@barclays\.com$"
)

def is_valid_barclays_email(email: str) -> bool:
    """
    Validates if the email belongs to Barclays domain.
    """

    if not email:
        return False

  
    email = email.strip().lower()

    return bool(BARCLAYS_EMAIL_PATTERN.match(email))