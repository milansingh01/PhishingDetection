export const kpiData = {
  totalScanned: 125430,
  fraudDetected: 7560,
  safeEmails: 117870,
  accuracy: 98.4,
  moneySaved: 2450000,
};

export const emailsScannedData = [
  { date: "Apr 1", emails: 3800 },
  { date: "Apr 4", emails: 4100 },
  { date: "Apr 7", emails: 3950 },
  { date: "Apr 10", emails: 4300 },
  { date: "Apr 12", emails: 4150 },
  { date: "Apr 14", emails: 4500 },
  { date: "Apr 16", emails: 4200 },
  { date: "Apr 18", emails: 4700 },
  { date: "Apr 19", emails: 4600 },
  { date: "Apr 21", emails: 4900 },
  { date: "Apr 23", emails: 5100 },
  { date: "Apr 25", emails: 4800 },
  { date: "Apr 27", emails: 5200 },
  { date: "Apr 29", emails: 5050 },
  { date: "Apr 30", emails: 5300 },
];

export const fraudVsSafeData = [
  { name: "Fraud", value: 6, color: "hsl(0, 72%, 51%)" },
  { name: "Safe", value: 94, color: "hsl(217, 91%, 60%)" },
];

export const departmentData = [
  { department: "Finance", cases: 2400 },
  { department: "HR", cases: 1800 },
  { department: "IT", cases: 1200 },
  { department: "Sales", cases: 800 },
  { department: "Support", cases: 350 },
];

export interface FraudCase {
  employee: string;
  department: string;
  emailId: string;
  fraudStatus: "Fraud" | "Safe";
  systemDecision: string;
  humanVerification: string;
  timestamp: string;
}

export const recentFraudCases: FraudCase[] = [
  { employee: "John Smith", department: "Finance", emailId: "j.sm***@barclays.com", fraudStatus: "Fraud", systemDecision: "System: Fraud", humanVerification: "Verified: Fraud", timestamp: "12:45 PM" },
  { employee: "Lisa Brown", department: "HR", emailId: "l.br***@barclays.com", fraudStatus: "Safe", systemDecision: "System: Safe", humanVerification: "Verified: Safe", timestamp: "11:20 AM" },
  { employee: "Mark Davis", department: "IT", emailId: "m.da***@barclays.com", fraudStatus: "Fraud", systemDecision: "System: Fraud", humanVerification: "Verified: Fraud", timestamp: "10:05 AM" },
  { employee: "Sara Patel", department: "Sales", emailId: "s.pa***@barclays.com", fraudStatus: "Fraud", systemDecision: "System: Fraud", humanVerification: "Verified: Fraud", timestamp: "9:30 AM" },
  { employee: "Alex Chen", department: "Finance", emailId: "a.ch***@barclays.com", fraudStatus: "Fraud", systemDecision: "System: Fraud", humanVerification: "Verified: Fraud", timestamp: "9:10 AM" },
  { employee: "Emily Ross", department: "Support", emailId: "e.ro***@barclays.com", fraudStatus: "Safe", systemDecision: "System: Safe", humanVerification: "Verified: Safe", timestamp: "8:45 AM" },
];

export const summaryData = {
  accuracy: 98.4,
  falsePositives: 15,
  falseNegatives: 10,
};

export const departments = ["All", "Finance", "HR", "IT", "Sales", "Support"];
