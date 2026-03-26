import { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom"; // Added useNavigate
import { motion } from "framer-motion";
import { Mail, ShieldAlert, ShieldCheck, Target, PoundSterling, Download, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/dashboard/Navbar";
import KpiCard from "@/components/dashboard/KpiCard";
import EmailsLineChart from "@/components/dashboard/EmailsLineChart";
import FraudPieChart from "@/components/dashboard/FraudPieChart";
import DepartmentBarChart from "@/components/dashboard/DepartmentBarChart";
import FraudTable from "@/components/dashboard/FraudTable";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { departments } from "@/data/mockData";
import { fetchDashboardData } from "@/services/api";

const Index = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const navigate = useNavigate(); // Hook for redirection

  // --- ADDED SECURITY CHECK ---
  useEffect(() => {
    const token = localStorage.getItem("fraud_token");
    if (!token) {
      navigate("/"); // Kick out unauthorized users
    }
  }, [navigate]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard', selectedDepartment],
    queryFn: () => fetchDashboardData(selectedDepartment),
    retry: 1, // Don't loop infinitely on auth errors
  });

  // --- IMPROVED LOADING STATE ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium">Connecting to Secure Database...</p>
        </div>
      </div>
    );
  }

  // --- SAFETY CHECK: Prevent "undefined" crashes if backend is slow/empty ---
  if (error || !data || !data.kpis) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-6">
        <ShieldAlert className="w-12 h-12 text-destructive" />
        <h2 className="text-xl font-bold">Session Expired or Connection Failed</h2>
        <p className="text-muted-foreground">Please log in again to access the Fraud Gateway.</p>
        <button onClick={() => navigate("/")} className="bg-primary text-white px-6 py-2 rounded-lg">Return to Login</button>
      </div>
    );
  }

  // Use Optional Chaining (?.) below to ensure that if one stat is missing, the whole page doesn't go white
  const kpis = [
    { title: "Total Emails Scanned", value: data.kpis?.totalScanned?.toLocaleString() || "0", icon: Mail },
    { title: "Fraud Emails Detected", value: data.kpis?.fraudDetected?.toLocaleString() || "0", icon: ShieldAlert },
    { title: "Safe Emails", value: data.kpis?.safeEmails?.toLocaleString() || "0", icon: ShieldCheck },
    { title: "Detection Accuracy", value: `${data.kpis?.accuracy || 0}%`, icon: Target },
    { title: "Money Saved", value: `£${((data.kpis?.moneySaved || 0) / 1000000).toFixed(1)}M`, icon: PoundSterling },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 space-y-5">
      <Navbar
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        departments={departments}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.title} title={kpi.title} value={kpi.value} icon={kpi.icon} delay={i * 0.08} />
        ))}
      </div>

      {/* Charts - Added safety fallbacks (|| []) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <EmailsLineChart data={data.charts?.emailsScanned || []} />
        <FraudPieChart data={data.charts?.fraudVsSafe || []} />
        <DepartmentBarChart data={data.charts?.departmentCases || []} />
      </div>

      {/* Table + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <FraudTable cases={data.cases || []} />
        </div>
        <SummaryCard data={data.performance || {}} />
      </div>

      {/* Download Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            const headers = ["Employee","Department","Email ID","Fraud Status","System Decision","Human Verification","Timestamp"];
            const rows = (data.cases || []).map(c => [c.employee, c.department, c.emailId, c.fraudStatus, c.systemDecision, c.humanVerification, c.timestamp]);
            const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "fraud-report.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30"
        >
          <Download className="w-4 h-4" />
          Download Report
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Index;