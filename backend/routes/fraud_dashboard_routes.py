from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.services.fraud_service import generate_stats
from backend.db.fraud_models import Scan
from backend.utils.auth_dependency import get_current_fraud_user

router = APIRouter(prefix="/fraud-dashboard", tags=["Fraud Dashboard"])

@router.get("/overview")
def dashboard(department: str = "All", db: Session = Depends(get_db), user=Depends(get_current_fraud_user)):
    # 1. Fetch data from DB
    query = db.query(Scan)
    
    # Filter by the dropdown in your screenshot
    if department != "All":
        query = query.filter(Scan.department == department)
    
    all_scans = query.order_by(Scan.timestamp.desc()).all()
    
    # 2. Format for the React Table (must match FraudTable.tsx keys)
    cases_list = []
    for s in all_scans:
        cases_list.append({
            "employee": s.employee_name,
            "department": s.department,
            "emailId": s.email_id,
            "fraudStatus": s.fraud_status,
            "systemDecision": s.system_decision,
            "humanVerification": s.human_verification,
            "timestamp": s.timestamp.strftime("%Y-%m-%d %H:%M")
        })

    # 3. Calculate KPIs for the cards
    total = len(all_scans)
    fraud_count = len([x for x in all_scans if x.fraud_status == "Phishing"])
    
    return {
        "kpis": {
            "totalScanned": total,
            "fraudDetected": fraud_count,
            "safeEmails": total - fraud_count,
            "accuracy": 99.2,
            "moneySaved": 4500000
        },
        "charts": {
            "emailsScanned": [{"date": "2024-03-20", "emails": total}],
            "fraudVsSafe": [
                {"name": "Safe", "value": total - fraud_count, "color": "#3b82f6"},
                {"name": "Fraud", "value": fraud_count, "color": "#ef4444"}
            ],
            "departmentCases": [{"department": "HR", "cases": 5}] # Mocked for now
        },
        "cases": cases_list, # THIS POPULATES THE TABLE
        "performance": {"accuracy": 99, "falsePositives": 2, "falseNegatives": 1}
    }
@router.get("/stats")
def stats(user=Depends(get_current_fraud_user), db: Session = Depends(get_db)):
    # You MUST pass 'db' into the service function here
    return generate_stats(db)