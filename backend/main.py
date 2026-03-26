from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.db.database import Base, engine
from backend.routes.auth_routes import router as auth_router
from backend.routes.scan_routes import router as scan_router  
from backend.routes.fraud_auth_routes import router as fraud_auth_router
from backend.routes.fraud_dashboard_routes import router as fraud_dashboard_router


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Phishing Detection Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080", # Fraud Dashboard
        "http://localhost:5173", 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(scan_router, prefix="/scan", tags=["Scanning"])
app.include_router(fraud_auth_router)
app.include_router(fraud_dashboard_router)

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}