import { useState } from "react";
import Login from "./components/Login";
import SelectOption from "./components/SelectOption";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";

export default function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("user"); // 🔥 force default
  const [currentOption, setCurrentOption] = useState("");

  return (
    <>
      {page === "login" && <Login setPage={setPage} setRole={setRole} />}

      {page === "select" && (
        <SelectOption setPage={setPage} setCurrentOption={setCurrentOption} />
      )}

      {page === "dashboard" && (
        role === "admin" ? (
          <Admin setPage={setPage} />
        ) : (
          <Dashboard
            setPage={setPage}
            currentOption={currentOption}
            setCurrentOption={setCurrentOption}
          />
        )
      )}
    </>
  );
}


// import React, { useState } from "react";
// import logoTop from "./assets/vite.svg";
// import logoCenter from "./assets/react.svg";

// export default function App() {
//   const [page, setPage] = useState("login");
//   const [role, setRole] = useState("");
//   const [currentOption, setCurrentOption] = useState("");

//   return (
//     <>
//       {page === "login" && (
//         <Login
//           setPage={setPage}
//           setRole={setRole}
//           setCurrentOption={setCurrentOption}
//         />
//       )}
//       {page === "select" && (
//         <SelectOption setPage={setPage} setCurrentOption={setCurrentOption} />
//       )}
//       {page === "dashboard" && role === "user" && (
//         <Dashboard
//           setPage={setPage}
//           currentOption={currentOption}
//           setCurrentOption={setCurrentOption}
//         />
//       )}
//       {page === "dashboard" && role === "admin" && <Admin setPage={setPage} />}
//     </>
//   );
// }

// /* ================= HEADER ================= */
// function Header() {
//   return (
//     <div style={styles.header}>
//       <img src={logoTop} alt="logo" style={styles.leftLogo} />
//     </div>
//   );
// }

// /* ================= LOGIN ================= */
// function Login({ setPage, setRole, setCurrentOption }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const users = [
//     { username: "admin", password: "1234", role: "user" },
//     { username: "user", password: "pass", role: "user" },
//     { username: "superadmin", password: "admin123", role: "admin" },
//   ];

//   const handleLogin = () => {
//     const found = users.find(
//       (u) => u.username === username && u.password === password
//     );
//     if (found) {
//       setRole(found.role);
//       setPage("select");
//     } else {
//       setError("Invalid Credentials");
//     }
//   };

//   return (
//     <div style={styles.loginContainer}>
//       <Header />
//       <div style={styles.loginCard}>
//         <img src={logoCenter} style={styles.centerLogoLarge} />
//         <h2 style={styles.title}>Barclays Secure Login</h2>
//         <input
//           placeholder="User ID"
//           style={styles.input}
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           style={styles.input}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button style={styles.primaryBtn} onClick={handleLogin}>
//           Login
//         </button>
//         {error && <p style={styles.error}>{error}</p>}
//       </div>
//     </div>
//   );
// }

// /* ================= SELECT OPTION ================= */
// function SelectOption({ setPage, setCurrentOption }) {
//   return (
//     <div style={styles.selectContainer}>
//       <Header />
//       <div style={styles.selectCard}>
//         <h2 style={styles.formalFont}>Select Scan Type</h2>
//         {["Email Content", "URL", "Attachment", "Audio", "Prompt Text"].map(
//           (item) => (
//             <button
//               key={item}
//               style={styles.selectBtn}
//               onClick={() => {
//                 setCurrentOption(item);
//                 setPage("dashboard");
//               }}
//             >
//               {item}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= DASHBOARD ================= */
// function Dashboard({ setPage, currentOption, setCurrentOption }) {
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);
//   const [risk, setRisk] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const [status, setStatus] = useState("");
//   const [reasons, setReasons] = useState([]);
//   const [action, setAction] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const humanReasons = {
//     suspiciousLink:
//       "Phishing attempt detected. Banks never ask you to click links for verification.",
//     shortenedUrl:
//       "Shortened URLs hide destinations. Always hover to check real link.",
//     passwordRequest:
//       "Never share passwords/PINs. Legitimate banks never request these via email.",
//     urgentLanguage:
//       "Panic words like 'urgent' are scam tactics. Verify directly with bank.",
//     unexpectedPrize:
//       "Unexpected winnings are scams. You didn't enter any lottery.",
//     genericGreeting: "Generic greetings like 'Dear Customer' are suspicious.",
//   };

//   const suspiciousWords = [
//     "urgent",
//     "verify",
//     "password",
//     "account suspended",
//     "click here",
//     "lottery",
//   ];
//   const suspiciousDomains = ["bit.ly", "tinyurl"];

//   const analyze = () => {
//     if (!text && !file) {
//       alert("Please enter 'scan type' content to analyse risk.");
//       return;
//     }
//     let score = 0;
//     let reasonList = [];
//     const lowerText = text.toLowerCase();

//     if (text.includes("http") || text.includes("www")) {
//       score += 30;
//       reasonList.push(humanReasons.suspiciousLink);
//     }
//     if (suspiciousDomains.some((d) => text.includes(d))) {
//       score += 25;
//       reasonList.push(humanReasons.shortenedUrl);
//     }
//     if (lowerText.includes("password") || lowerText.includes("pin")) {
//       score += 35;
//       reasonList.push(humanReasons.passwordRequest);
//     }
//     if (suspiciousWords.some((word) => lowerText.includes(word))) {
//       score += 20;
//       reasonList.push(humanReasons.urgentLanguage);
//     }
//     if (lowerText.includes("lottery") || lowerText.includes("winner")) {
//       score += 25;
//       reasonList.push(humanReasons.unexpectedPrize);
//     }
//     if (
//       lowerText.includes("dear customer") ||
//       lowerText.includes("dear user")
//     ) {
//       score += 15;
//       reasonList.push(humanReasons.genericGreeting);
//     }

//     if (score > 100) score = 100;
//     setRisk(score);

//     const riskConfigs = {
//       0: {
//         status: "SAFE - No Threats Detected",
//         reasons: [
//           "No Results - No phishing indicators found.",
//           "Content is completely clean.",
//         ],
//         action:
//           "Safe to proceed. Sender verification optional for trusted contacts.",
//       },
//       10: {
//         status: "VERY LOW RISK",
//         reasons: [
//           "Minimal generic patterns detected.",
//           "No actionable threats found.",
//         ],
//         action:
//           "Safe with basic sender email verification (@barclays.com domain check).",
//       },
//       20: {
//         status: "VERY LOW RISK",
//         reasons: [
//           "One minor suspicious pattern.",
//           "No serious indicators present.",
//         ],
//         action: "Safe but verify sender email address carefully.",
//       },
//       30: {
//         status: "LOW RISK",
//         reasons: [
//           "Low-level generic greeting detected.",
//           "No links/password requests.",
//         ],
//         action: "Safe to open. Double-check sender before clicking anything.",
//       },
//       40: {
//         status: "LOW RISK - Monitor",
//         reasons: [
//           "Minor suspicious words present.",
//           "No critical threats detected.",
//         ],
//         action: "Verify sender then proceed with caution.",
//       },
//       50: {
//         status: "MEDIUM RISK - Caution",
//         reasons: [
//           "Moderate suspicious patterns.",
//           "Suspicious language detected.",
//         ],
//         action: "Do NOT click links. Call Barclays: 0345 734 5345 to verify.",
//       },
//       60: {
//         status: "MEDIUM RISK - Suspicious",
//         reasons: [
//           "Multiple moderate indicators.",
//           "Potential phishing attempt.",
//         ],
//         action: "Hold action. Contact Barclays directly via official channels.",
//       },
//       70: {
//         status: "MEDIUM/HIGH RISK",
//         reasons: [
//           "Strong phishing indicators present.",
//           "High caution required.",
//         ],
//         action:
//           "Quarantine content. Forward to [phishing@barclays.com](mailto:phishing@barclays.com) for review.",
//       },
//       80: {
//         status: "HIGH RISK - Phishing Likely",
//         reasons:
//           reasonList.length > 0
//             ? reasonList
//             : ["High-risk characteristics detected."],
//         action:
//           "Delete immediately. Forward to [phishing@barclays.com](mailto:phishing@barclays.com) NOW.",
//       },
//       90: {
//         status: "HIGH RISK - Phishing Confirmed",
//         reasons:
//           reasonList.length > 0
//             ? [...reasonList, "Multiple confirmed phishing markers."]
//             : ["Confirmed phishing characteristics."],
//         action:
//           "URGENT: Delete + report to [phishing@barclays.com](mailto:phishing@barclays.com) immediately.",
//       },
//       100: {
//         status: "CRITICAL RISK - DANGEROUS",
//         reasons:
//           reasonList.length > 0
//             ? [...reasonList, "MAXIMUM phishing threat level."]
//             : ["Critical phishing threat detected."],
//         action:
//           "EMERGENCY: Delete immediately. Report to Barclays Security NOW.",
//       },
//     };

//     const riskKey = Math.round(score / 10) * 10;
//     const config = riskConfigs[riskKey] || riskConfigs[0];

//     setStatus(config.status);
//     setReasons(config.reasons);
//     setAction(config.action);
//     setShowResult(true);
//     setIsEditing(false); // Reset editing state after analysis
//   };

//   const handleLogout = () => {
//     setPage("login");
//   };

//   const getArcColor = (percent) => {
//     if (percent <= 30) return "#2e7d32";
//     if (percent <= 70) return "#ff9800";
//     return "#d32f2f";
//   };

//   const selectOption = (newOption) => {
//     setCurrentOption(newOption);
//     setShowResult(false);
//     setText("");
//     setFile(null);
//     setIsEditing(false);
//     setSidebarOpen(false);
//   };

//   const handleTextChange = (e) => {
//     setText(e.target.value);
//     if (showResult) {
//       setIsEditing(true);
//     }
//   };

//   const handleTextFocus = () => {
//     if (showResult) {
//       setIsEditing(true);
//     }
//   };

//   return (
//     <div style={styles.dashboardContainer}>
//       <Header />
//       <div style={styles.blueHeader}>
//         <div style={styles.headerContent}>
//           <span
//             style={styles.hamburger}
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             ☰
//           </span>
//           <span style={styles.dashboardTitle}>Fraud Detection Dashboard</span>
//           <button style={styles.logoutBtn} onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {sidebarOpen && (
//         <div style={styles.sidebar}>
//           <button
//             style={styles.sidebarClose}
//             onClick={() => setSidebarOpen(false)}
//           >
//             ×
//           </button>
//           {["Email Content", "URL", "Attachment", "Audio", "Prompt Text"].map(
//             (item) => (
//               <p
//                 key={item}
//                 style={styles.sidebarItem}
//                 onClick={() => selectOption(item)}
//               >
//                 {item}
//               </p>
//             )
//           )}
//         </div>
//       )}

//       <div style={styles.mainContent}>
//         <button
//           style={styles.crossBtn}
//           onClick={() => {
//             setCurrentOption("");
//             setPage("select");
//           }}
//         >
//           ×
//         </button>

//         {/* Scanning box - ALWAYS shows only "Analyze Risk" button */}
//         {!showResult ? (
//           <div style={styles.scanPanel()}>
//             <div style={styles.centerContent}>
//               <h2 style={styles.scanTypeTitle}>{currentOption}</h2>
//               {(currentOption === "Email Content" ||
//                 currentOption === "URL" ||
//                 currentOption === "Prompt Text") && (
//                 <textarea
//                   style={styles.textareaOptimized()}
//                   placeholder="Paste content here for analysis..."
//                   value={text}
//                   onChange={handleTextChange}
//                 />
//               )}
//               {(currentOption === "Attachment" ||
//                 currentOption === "Audio") && (
//                 <>
//                   <input
//                     type="file"
//                     style={styles.fileInput}
//                     onChange={(e) => setFile(e.target.files[0])}
//                   />
//                   {file && (
//                     <div style={styles.fileBox}>
//                       {file.name}
//                       <button
//                         style={styles.removeFile}
//                         onClick={() => setFile(null)}
//                       >
//                         ×
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//               <div style={{ ...styles.btnSpacing, marginTop: "auto" }}>
//                 <button style={styles.primaryBtn} onClick={analyze}>
//                   Analyze Risk
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div style={styles.sideBySideContainer}>
//             <div style={styles.scanPanelSide}>
//               <div style={styles.centerContent}>
//                 <h2 style={styles.scanTypeTitle}>{currentOption}</h2>
//                 {(currentOption === "Email Content" ||
//                   currentOption === "URL" ||
//                   currentOption === "Prompt Text") && (
//                   <>
//                     <textarea
//                       style={styles.textareaOptimized()}
//                       value={text}
//                       onChange={handleTextChange}
//                       onFocus={handleTextFocus}
//                     />
//                     {isEditing && (
//                       <div style={styles.btnSpacing}>
//                         <button style={styles.primaryBtn} onClick={analyze}>
//                           Analyze Risk Again
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 )}
//                 {(currentOption === "Attachment" ||
//                   currentOption === "Audio") && (
//                   <>
//                     <input
//                       type="file"
//                       style={styles.fileInput}
//                       onChange={(e) => setFile(e.target.files[0])}
//                     />
//                     {file && (
//                       <div style={styles.fileBox}>
//                         {file.name}
//                         <button
//                           style={styles.removeFile}
//                           onClick={() => setFile(null)}
//                         >
//                           ×
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>

//             <div style={styles.riskPanelSide}>
//               <div style={styles.panelContent}>
//                 <h2 style={styles.riskAssessmentTitle}>Risk Assessment</h2>
//                 <div style={styles.semiCircleContainer}>
//                   <svg width="160" height="95" viewBox="0 0 160 95">
//                     <path
//                       d="M 14 72 A 66 66 0 0 1 146 72"
//                       fill="none"
//                       stroke="#e0e0e0"
//                       strokeWidth="10"
//                       strokeLinecap="round"
//                     />
//                     <path
//                       d={describeArc(80, 72, 66, 0, (risk / 100) * 180)}
//                       fill="none"
//                       stroke={getArcColor(risk)}
//                       strokeWidth="10"
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                   <div style={styles.riskPercent}>{risk}%</div>
//                 </div>
//                 <h3 style={styles.statusHeading}>
//                   Status: <span style={styles.statusText}>{status}</span>
//                 </h3>
//                 <h4 style={styles.boldHeadingLeft}>Reasons:</h4>
//                 {reasons.slice(0, 3).map((r, i) => (
//                   <p key={i} style={styles.reasonText}>
//                     {r}
//                   </p>
//                 ))}
//                 <h4 style={styles.boldHeadingLeft}>Recommended Actions:</h4>
//                 <p style={styles.actionText}>{action}</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= ADMIN ================= */
// function Admin({ setPage }) {
//   return (
//     <div style={styles.loginContainer}>
//       <Header />
//       <div style={styles.loginCard}>
//         <h2 style={styles.formalFont}>Admin Control Panel</h2>
//         <p>System Monitoring</p>
//         <p>User Management</p>
//         <p>Security Logs</p>
//       </div>
//     </div>
//   );
// }

// /* ================= STYLES ================= */
// const styles = {
//   formalFont: {
//     fontFamily:
//       "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     fontWeight: 300,
//     fontSize: 18,
//     textAlign: "center",
//   },
//   dashboardTitle: {
//     fontSize: 20,
//     fontWeight: 300,
//     fontFamily:
//       "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     flex: 1,
//   },
//   headerContent: {
//     display: "flex",
//     alignItems: "center",
//     width: "100%",
//     gap: "12px",
//   },
//   logoutBtn: {
//     background: "rgba(255,255,255,0.2)",
//     color: "white",
//     border: "1px solid rgba(255,255,255,0.3)",
//     padding: "6px 14px",
//     borderRadius: 6,
//     cursor: "pointer",
//     fontSize: 13,
//     fontWeight: 500,
//     fontFamily: "'Segoe UI', sans-serif",
//     marginRight: "15px",
//   },
//   scanTypeTitle: {
//     fontFamily:
//       "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     fontWeight: 300,
//     fontSize: 22,
//     textAlign: "center",
//     marginBottom: 12,
//     marginTop: 0,
//     width: "100%",
//   },
//   riskAssessmentTitle: {
//     fontFamily:
//       "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     fontWeight: 300,
//     fontSize: 24,
//     textAlign: "center",
//     marginBottom: 12,
//     marginTop: 1,
//   },
//   boldHeadingLeft: {
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     fontWeight: "bold",
//     fontSize: 16,
//     margin: "10px 0 4px 0",
//     textAlign: "left",
//   },
//   statusHeading: {
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     fontWeight: "bold",
//     fontSize: 16,
//     margin: "12px 0 4px 0",
//     textAlign: "left",
//   },
//   statusText: {
//     fontWeight: "normal",
//     color: "#d32f2f",
//     fontSize: 16,
//   },
//   reasonText: {
//     marginTop: 6,
//     fontSize: 16,
//     color: "#444",
//     textAlign: "left",
//     fontWeight: "normal",
//     lineHeight: 1.3,
//   },
//   actionText: {
//     marginTop: 3,
//     fontWeight: "normal",
//     fontSize: 16,
//     lineHeight: 1.3,
//     textAlign: "left",
//   },
//   sideBySideContainer: {
//     display: "flex",
//     gap: "20px",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     maxWidth: 820,
//     height: "100%",
//   },
//   scanPanelSide: {
//     flex: 1,
//     width: 450,
//     height: 500,
//     background: "#fff",
//     padding: 28,
//     borderRadius: 18,
//     boxShadow: "0 12px 36px rgba(0,0,0,0.16)",
//     display: "flex",
//     flexDirection: "column",
//   },
//   riskPanelSide: {
//     flex: 1,
//     width: 450,
//     height: 500,
//     background: "#fff",
//     padding: 28,
//     borderRadius: 18,
//     boxShadow: "0 12px 36px rgba(0,0,0,0.16)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   scanPanel: () => ({
//     width: 600,
//     height: 500,
//     maxHeight: "calc(100vh - 140px)",
//     background: "#fff",
//     padding: 24,
//     borderRadius: 21,
//     boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
//     boxSizing: "border-box",
//     display: "flex",
//     flexDirection: "column",
//     margin: "0 auto",
//   }),
//   textareaOptimized: () => ({
//     flex: 1,
//     minHeight: 120,
//     width: "100%",
//     marginTop: 1,
//     padding: 18,
//     border: "1px solid #ddd",
//     borderRadius: 18,
//     resize: "none",
//     fontSize: 14,
//     boxSizing: "border-box",
//     fontFamily: "'Courier New', monospace",
//     lineHeight: 1.4,
//     textAlign: "left",
//     display: "block",
//   }),
//   loginContainer: {
//     width: "100vw",
//     height: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "linear-gradient(135deg, #f0f6ff 0%, #e3f2fd 100%)",
//     margin: 0,
//     padding: 0,
//     overflow: "hidden",
//   },
//   selectContainer: {
//     width: "100vw",
//     height: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "linear-gradient(135deg, #f0f6ff 0%, #e3f2fd 100%)",
//     margin: 0,
//     padding: 0,
//   },
//   dashboardContainer: {
//     width: "100vw",
//     height: "100vh",
//     background: "linear-gradient(135deg, #f0f6ff 0%, #e3f2fd 100%)",
//     margin: 0,
//     padding: 0,
//     position: "relative",
//     overflow: "hidden",
//   },
//   header: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     background: "white",
//     padding: "12px 22px",
//     borderBottom: "1px solid #e0e0e0",
//     display: "flex",
//     alignItems: "center",
//     zIndex: 1000,
//     boxSizing: "border-box",
//   },
//   blueHeader: {
//     position: "fixed",
//     top: "65px",
//     left: 0,
//     width: "100vw",
//     background: "#004a8f",
//     padding: "10px 16px",
//     color: "white",
//     zIndex: 999,
//     boxSizing: "border-box",
//   },
//   leftLogo: { height: 42 },
//   centerLogoLarge: { height: 100, marginBottom: 1 },
//   loginCard: {
//     background: "white",
//     padding: 24,
//     width: 420,
//     maxWidth: "85vw",
//     borderRadius: 16,
//     textAlign: "center",
//     boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
//   },
//   selectCard: {
//     background: "white",
//     padding: 28,
//     width: 380,
//     maxWidth: "85vw",
//     borderRadius: 16,
//     textAlign: "center",
//     boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
//   },
//   title: {
//     color: "#004a8f",
//     marginBottom: 20,
//     fontSize: 22,
//     fontFamily:
//       "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     fontWeight: 300,
//     textAlign: "center",
//   },
//   input: {
//     width: "100%",
//     padding: 14,
//     marginBottom: 12,
//     border: "1px solid #ddd",
//     borderRadius: 10,
//     fontSize: 15,
//     boxSizing: "border-box",
//     textAlign: "center",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   selectBtn: {
//     width: "100%",
//     padding: 14,
//     background: "#f8f9fa",
//     color: "#333",
//     border: "2px solid #e9ecef",
//     margin: "8px 0",
//     borderRadius: 10,
//     cursor: "pointer",
//     fontSize: 15,
//     fontFamily:
//       "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   },
//   primaryBtn: {
//     width: "100%",
//     padding: 14,
//     background: "#004a8f",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     borderRadius: 10,
//     fontSize: 15,
//     fontWeight: 300,
//     fontFamily:
//       "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     marginTop: 8,
//   },
//   hamburger: {
//     fontSize: 22,
//     cursor: "pointer",
//     padding: "5px 8px",
//     borderRadius: 5,
//   },
//   sidebar: {
//     position: "fixed",
//     top: "88px",
//     left: 0,
//     width: 240,
//     height: "calc(100vh - 88px)",
//     background: "white",
//     boxShadow: "3px 0 16px rgba(0,0,0,0.1)",
//     zIndex: 1001,
//     padding: "16px",
//   },
//   sidebarClose: {
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     fontSize: 18,
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     color: "#666",
//   },
//   sidebarItem: {
//     padding: "14px 10px",
//     cursor: "pointer",
//     borderBottom: "1px solid #f0f0f0",
//     margin: 0,
//     fontSize: 18,
//     fontWeight: 500,
//     fontFamily:
//       "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   },
//   mainContent: {
//     marginTop: "110px",
//     padding: "20px 16px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     gap: "20px",
//     height: "calc(100vh - 110px)",
//     boxSizing: "border-box",
//     overflow: "hidden",
//   },
//   crossBtn: {
//     position: "fixed",
//     top: "74px",
//     right: "20px",
//     fontSize: 20,
//     background: "rgba(255,255,255,0.95)",
//     border: "none",
//     borderRadius: "50%",
//     width: 38,
//     height: 38,
//     cursor: "pointer",
//     zIndex: 100,
//   },
//   centerContent: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     textAlign: "center",
//     width: "100%",
//     height: "100%",
//     justifyContent: "flex-start",
//     gap: 10,
//   },
//   panelContent: {
//     width: "100%",
//     height: "100%",
//     overflow: "auto",
//     paddingRight: 3,
//   },
//   fileInput: {
//     width: "100%",
//     padding: 16,
//     marginTop: 12,
//     border: "1px solid #ddd",
//     borderRadius: 10,
//     background: "#f8f9fa",
//     textAlign: "center",
//     fontSize: 14,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   btnSpacing: {
//     marginTop: 16,
//     width: "100%",
//   },
//   fileBox: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     background: "#f8f9fa",
//     padding: 14,
//     marginTop: 12,
//     borderRadius: 10,
//     fontSize: 14,
//   },
//   removeFile: {
//     border: "none",
//     background: "transparent",
//     fontSize: 16,
//     cursor: "pointer",
//     color: "#666",
//   },
//   semiCircleContainer: {
//     margin: "12px auto",
//     textAlign: "center",
//     position: "relative",
//     height: 110,
//     width: 180,
//   },
//   riskPercent: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#333",
//   },
//   error: {
//     color: "#d32f2f",
//     marginTop: 8,
//     fontSize: 14,
//     fontWeight: 500,
//     textAlign: "center",
//   },
// };

// /* ================= UTILITY ================= */
// function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
//   const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
//   return {
//     x: centerX + radius * Math.cos(angleInRadians),
//     y: centerY + radius * Math.sin(angleInRadians),
//   };
// }

// function describeArc(x, y, radius, startAngle, endAngle) {
//   const start = polarToCartesian(x, y, radius, startAngle);
//   const end = polarToCartesian(x, y, radius, endAngle);
//   const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
//   return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
// }