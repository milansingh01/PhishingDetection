import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";

const USERS = [{ email: "admin@example.com", password: "admin123" }];

const KPI_DATA = [
  { title: "Total Emails Scanned", value: "125,430" },
  { title: "Fraud Emails Detected", value: "7,560" },
  { title: "Safe Emails", value: "117,870" },
  { title: "Detection Accuracy", value: "98.4%" },
  { title: "Money Saved", value: "£2,450,000" }
];

const LINE_DATA = [
  { name: "Apr 1", value: 4000 },
  { name: "Apr 5", value: 4200 },
  { name: "Apr 10", value: 3800 },
  { name: "Apr 12", value: 4500 },
  { name: "Apr 15", value: 4200 },
  { name: "Apr 18", value: 4400 },
  { name: "Apr 20", value: 4100 },
  { name: "Apr 25", value: 4800 },
  { name: "Apr 30", value: 5100 }
];

const PIE_DATA = [
  { name: "Fraud", value: 6 },
  { name: "Safe", value: 94 }
];

const BAR_DATA = [
  { name: "Finance", value: 2500 },
  { name: "HR", value: 1400 },
  { name: "IT", value: 900 },
  { name: "Sales", value: 700 },
  { name: "Support", value: 400 }
];

const TABLE_DATA = [
  ["John Smith", "Finance", "••••••", "Fraud", "System: Fraud", "Verified: Fraud", "12:45 PM"],
  ["Lisa Brown", "HR", "••••••", "Safe", "System: Safe", "Verified: Safe", "11:20 AM"],
  ["Mark Davis", "IT", "••••••", "Fraud", "System: Fraud", "Verified: Fraud", "10:05 AM"],
  ["Sara Patel", "Sales", "••••••", "Fraud", "System: Fraud", "Verified: Fraud", "9:30 AM"]
];

const COLORS = ["#ef4444", "#2563eb"];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = USERS.find(u => u.email === email && u.password === password);
    if (user) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  const downloadCSV = () => {
    const headers = ["Employee", "Department", "Email", "Status", "System", "Verification", "Time"];
    const rows = TABLE_DATA.map(r => r.join(","));
    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "fraud_report.csv";
    a.click();
  };

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f3f5f7]">
        <div className="bg-white p-6 rounded-md shadow w-80">
          <h2 className="text-lg font-semibold mb-4">Login</h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <input className="w-full mb-3 px-3 py-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input type="password" className="w-full mb-3 px-3 py-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f3f5f7] min-h-screen flex justify-center py-6">

      <div className="w-[95%] max-w-[1380px] bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#0a3d91] to-[#1e73be] px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3 text-white">

            {/* REAL LOGO */}
            <img src="/barclays.jpg" className="w-7 h-7 object-contain" />

            <span className="text-xl font-semibold tracking-wide text-white">
              BARCLAYS
            </span>

            <span className="opacity-60 text-white">|</span>

            <span className="text-lg font-medium text-white">
              Fraud Detection Dashboard
            </span>
          </div>

        </div>

        <div className="px-6 py-5">

          {/* KPI */}
          <div className="grid grid-cols-5 gap-4 mb-5">
            {KPI_DATA.map((kpi, i) => (
              <div key={i}
                className="border border-gray-200 rounded-md px-4 py-3 bg-white">
                <p className="text-sm text-gray-500">{kpi.title}</p>
                <p className="text-xl font-semibold text-[#0a3d91] mt-1">
                  {kpi.value}
                </p>
              </div>
            ))}
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-3 gap-5 mb-5">

            <div className="border border-gray-200 rounded-md p-3">
              <p className="text-sm font-medium mb-2">
                Emails Scanned - Last 30 Days
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={LINE_DATA}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="border border-gray-200 rounded-md p-3 text-center">
              <p className="text-sm font-medium mb-2">
                Fraud vs. Safe Emails
              </p>
              <PieChart width={200} height={200}>
                <Pie data={PIE_DATA} dataKey="value" outerRadius={70}>
                  {PIE_DATA.map((e, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
              </PieChart>
            </div>

            <div className="border border-gray-200 rounded-md p-3">
              <p className="text-sm font-medium mb-2">
                Fraud Cases by Department
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={BAR_DATA}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LOWER */}
          <div className="grid grid-cols-4 gap-5">

            <div className="border border-gray-200 rounded-md p-3">
              <p className="text-sm font-medium mb-3">
                Recent Fraud Cases
              </p>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Accuracy</span>
                  <span className="font-semibold text-[#0a3d91]">98.4%</span>
                </div>
                <div className="flex justify-between">
                  <span>False Positives</span>
                  <span className="font-semibold">15</span>
                </div>
                <div className="flex justify-between">
                  <span>False Negatives</span>
                  <span className="font-semibold">10</span>
                </div>
              </div>
            </div>

            <div className="col-span-3 border border-gray-200 rounded-md p-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b text-gray-600">
                    <th className="text-left py-2">Employee</th>
                    <th>Department</th>
                    <th>Email ID</th>
                    <th>Fraud Status</th>
                    <th>System Decision</th>
                    <th>Human Verification</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>

                <tbody>
                  {TABLE_DATA.map((row, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-2">{row[0]}</td>
                      <td>{row[1]}</td>
                      <td className="blur-sm">{row[2]}</td>
                      <td>
                        <span className={`px-2 py-1 text-white text-xs rounded 
                        ${row[3] === "Fraud" ? "bg-red-500" : "bg-green-500"}`}>
                          {row[3]}
                        </span>
                      </td>
                      <td>{row[4]}</td>
                      <td>{row[5]}</td>
                      <td>{row[6]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DOWNLOAD */}
          <div className="flex justify-end mt-6">
            <button
              onClick={downloadCSV}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm rounded shadow"
            >
              Download Report
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}