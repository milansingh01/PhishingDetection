from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.db.database import Base

# Import routes
from backend.routes.auth_routes import router as auth_router

# Import DB setup
from backend.db.database import engine
from backend.routes.scan_routes import router as scan_router


# -----------------------------
# CREATE APP
# -----------------------------
app = FastAPI(title="Phishing Detection Backend")
app.include_router(
    scan_router,
    prefix="/scan",
    tags=["Scan"]
)
# -----------------------------
# CORS (for frontend connection)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change later for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# CREATE DATABASE TABLES
# -----------------------------
Base.metadata.create_all(bind=engine)

# -----------------------------
# REGISTER ROUTES
# -----------------------------
app.include_router(auth_router)

# -----------------------------
# ROOT TEST
# -----------------------------
@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}
# Base.metadata.create_all(bind=engine)