import { FraudCase } from "@/data/mockData";

export interface DashboardResponse {
  kpis: {
    totalScanned: number;
    fraudDetected: number;
    safeEmails: number;
    accuracy: number;
    moneySaved: number;
  };
  charts: {
    emailsScanned: { date: string; emails: number }[];
    fraudVsSafe: { name: string; value: number; color: string }[];
    departmentCases: { department: string; cases: number }[];
  };
  cases: FraudCase[];
  performance: {
    accuracy: number;
    falsePositives: number;
    falseNegatives: number;
  };
}

export const fetchDashboardData = async (department: string): Promise<DashboardResponse> => {
  // 1. Retrieve the secure token saved during Login
  const token = localStorage.getItem("fraud_token");

  if (!token) {
    // If no token exists, the user shouldn't be here
    throw new Error("No authentication token found. Please log in.");
  }

  // 2. Point to your REAL backend on Port 9000
  // We append 'department' and 'token' as query parameters to match your backend dependency
  const baseUrl = "http://localhost:9000/fraud-dashboard/overview";
  const queryParams = new URLSearchParams({
    department: department,
    token: token // This matches: def get_current_user(token: str = Query(None))
  });

  const response = await fetch(`${baseUrl}?${queryParams.toString()}`);

  // 3. Handle Unauthorized (401)
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("fraud_token");
      window.location.href = "/"; // Auto-redirect to login
      throw new Error("Session expired. Redirecting...");
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to fetch fraud data from server.");
  }

  // 4. Return the real data from your Python Database
  return response.json();
};
