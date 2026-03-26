import { 
  kpiData, 
  emailsScannedData, 
  fraudVsSafeData, 
  departmentData, 
  recentFraudCases, 
  summaryData,
  FraudCase
} from "@/data/mockData";

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

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchDashboardData = async (department: string): Promise<DashboardResponse> => {
  await delay(800); // 800ms mock delay to show loading state

  // If "All" is selected, return base mock data
  if (department === "All") {
    return {
      kpis: kpiData,
      charts: {
        emailsScanned: emailsScannedData,
        fraudVsSafe: fraudVsSafeData,
        departmentCases: departmentData,
      },
      cases: recentFraudCases,
      performance: summaryData,
    };
  }

  // Otherwise, mock filtered data specific to the department
  // We use a pseudo-random multiplier based on department length to make mock data look realistic.
  const multiplier = department.length / 10; 

  const filteredCases = recentFraudCases.filter(c => c.department === department);

  return {
    kpis: {
      totalScanned: Math.floor(kpiData.totalScanned * multiplier),
      fraudDetected: Math.floor(kpiData.fraudDetected * multiplier),
      safeEmails: Math.floor(kpiData.safeEmails * multiplier),
      accuracy: Number((kpiData.accuracy - (Math.random() * 2)).toFixed(1)),
      moneySaved: Math.floor(kpiData.moneySaved * multiplier),
    },
    charts: {
      emailsScanned: emailsScannedData.map(d => ({ ...d, emails: Math.floor(d.emails * multiplier) })),
      fraudVsSafe: [
        { name: "Fraud", value: Math.floor(Math.random() * 15) + 1, color: "hsl(0, 72%, 51%)" },
        { name: "Safe", value: Math.floor(Math.random() * 80) + 85, color: "hsl(217, 91%, 60%)" }
      ],
      departmentCases: departmentData.map(d => ({
        ...d,
        cases: d.department === department ? d.cases : 0
      })).filter(d => d.cases > 0),
    },
    cases: filteredCases,
    performance: {
      accuracy: Number((summaryData.accuracy - (Math.random() * 2)).toFixed(1)),
      falsePositives: Math.floor(summaryData.falsePositives * multiplier) || 1,
      falseNegatives: Math.floor(summaryData.falseNegatives * multiplier) || 1,
    },
  };
};
