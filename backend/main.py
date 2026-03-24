from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.db.database import Base, engine

# Import routes
from backend.routes.auth_routes import router as auth_router
from backend.routes.scan_routes import router as scan_router

# -----------------------------
# CREATE DATABASE TABLES
# -----------------------------
# This stays! It's perfectly fine for your current setup.
Base.metadata.create_all(bind=engine)

# -----------------------------
# CREATE APP
# -----------------------------
app = FastAPI(title="Phishing Detection Backend")
app = FastAPI()

# MUST BE FIRST
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTERS MUST BE AFTER MIDDLEWARE
app.include_router(auth_router, prefix="/auth")

# -----------------------------
# ROOT TEST
# -----------------------------
@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}