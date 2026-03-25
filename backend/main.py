from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.db.database import Base, engine

# Import routes
from backend.routes.auth_routes import router as auth_router
from backend.routes.scan_routes import router as scan_router  # This will now be colorful!

# -----------------------------
# CREATE DATABASE TABLES
# -----------------------------
Base.metadata.create_all(bind=engine)

# -----------------------------
# CREATE APP
# -----------------------------
# Combined into one definition to avoid overwriting the app
app = FastAPI(title="Phishing Detection Backend")

# -----------------------------
# MIDDLEWARE
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# INCLUDE ROUTERS
# -----------------------------
# This is the "Key" that makes the endpoints show up in your API
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(scan_router, prefix="/scan", tags=["Scanning"])

# -----------------------------
# ROOT TEST
# -----------------------------
@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}