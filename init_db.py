from backend.db.database import Base, engine
from backend.db import models  # IMPORTANT
from backend.db import fraud_models
print("Creating tables...")

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")