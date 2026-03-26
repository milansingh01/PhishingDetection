import { useState } from "react";
import Header from "./Header";
import { styles } from "../styles/styles";

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}

export default function Dashboard({ setPage, currentOption }) {
  const [email, setEmail] = useState("");
  const [risk, setRisk] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [status, setStatus] = useState("");
  const [reasons, setReasons] = useState([]);
  const [action, setAction] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [signals, setSignals] = useState({
    url: 0,
    text: 0,
    attachment: 0,
    voice: 0,
  });

  const [fraudType, setFraudType] = useState("");
  const [confidence, setConfidence] = useState(0);

  const highlightText = (text, reasons) => {
    if (!text || typeof text !== "string") return "";
    let highlighted = text;

    reasons.forEach((reason) => {
      const words = reason.split(" ").slice(0, 2);
      words.forEach((word) => {
        if (word.length > 4) {
          const regex = new RegExp(`(${word})`, "gi");
          highlighted = highlighted.replace(
            regex,
            `<mark style="background:#ffcccc;">$1</mark>`
          );
        }
      });
    });

    return highlighted;
  };

  const analyze = async () => {
    if (!email) return alert("Please enter content.");

    try {
      setStatus("Scanning...");

      let body;
      let headers = {};

      if (currentOption === "Attachment" && email instanceof File) {
        const formData = new FormData();
        formData.append("file", email);
        formData.append("type", currentOption);
        body = formData;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({
          content: email,
          type: currentOption,
        });
      }

      const response = await fetch("http://127.0.0.1:9000/scan/predict", {
        method: "POST",
        headers,
        body,
      });

      const data = await response.json();

      if (!data) throw new Error("Invalid response");

      setRisk(data.risk_score || 0);
      setStatus(data.status || "Complete");
      setReasons(data.reasons || []);
      setAction(data.action || "");

      setSignals(
        data.signals || {
          url: 0,
          text: 0,
          attachment: 0,
          voice: 0,
        }
      );

      setFraudType(data.fraud_type || "Unknown");
      setConfidence(data.confidence || 0);

      setShowResult(true);
    } catch (e) {
      console.error(e);
      alert("Backend error or invalid response");
    }
  };

  const getArcColor = (percent) => {
    if (percent <= 30) return "#2e7d32";
    if (percent <= 70) return "#ff9800";
    return "#d32f2f";
  };

  return (
    <div style={styles.dashboardContainer}>
      <Header />

      <div style={styles.blueHeader}>
        <div style={styles.headerContent}>
          <span style={styles.hamburger} onClick={() => setSidebarOpen(!sidebarOpen)}>☰</span>
          <span style={styles.dashboardTitle}>Fraud Detection Dashboard</span>
          <button style={styles.logoutBtn} onClick={() => setPage("login")}>Logout</button>
        </div>
      </div>

      <div style={styles.mainContent}>
        {!showResult ? (
          <div style={styles.scanPanel}>
            <h2>{currentOption || "Scan"}</h2>

            {currentOption === "Attachment" ? (
              <>
                <input
                  type="file"
                  style={styles.fileInput}
                  onChange={(e) => setEmail(e.target.files[0])}
                />

                {email instanceof File && (
                  <div style={styles.fileBox}>
                    {email.name}
                    <button onClick={() => setEmail("")}>✕</button>
                  </div>
                )}
              </>
            ) : (
              <textarea
                style={styles.textareaOptimized}
                placeholder="Paste email content here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}

            <button style={styles.primaryBtn} onClick={analyze}>
              Analyze Risk
            </button>
          </div>
        ) : (
          <div style={styles.sideBySideContainer}>
            <div style={styles.scanPanelSide}>
              <h2>{currentOption || "Scan"}</h2>

              {typeof email === "string" ? (
                <div
                  style={{
                    ...styles.textareaOptimized,
                    overflow: "auto",
                    whiteSpace: "pre-wrap"
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlightText(email, reasons),
                  }}
                />
              ) : (
                <p>File uploaded: {email.name}</p>
              )}

              <button style={styles.primaryBtn} onClick={analyze}>
                Re-Scan
              </button>
            </div>

            <div style={styles.riskPanelSide}>
              <div style={styles.panelContent}>
                <h2 style={styles.riskAssessmentTitle}>Risk Assessment</h2>

                <div style={styles.semiCircleContainer}>
                  <svg width="160" height="95">
                    <path d="M 14 72 A 66 66 0 0 1 146 72" fill="none" stroke="#e0e0e0" strokeWidth="12" />
                    <path
                      d={describeArc(80, 72, 66, -90, (risk / 100 * 180) - 90)}
                      fill="none"
                      stroke={getArcColor(risk)}
                      strokeWidth="12"
                    />
                  </svg>
                  <div style={styles.riskPercent}>{risk}%</div>
                </div>

                <h3>Type: {fraudType}</h3>
                <h3>Confidence: {Math.round(confidence * 100)}%</h3>

                <h4 style={styles.boldHeadingLeft}>Signal Breakdown:</h4>
                {signals && Object.entries(signals).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>{key}</span>
                      <span>{value}%</span>
                    </div>
                    <div style={{ height: 8, background: "#eee", borderRadius: 6 }}>
                      <div style={{
                        width: `${value}%`,
                        height: "100%",
                        background: getArcColor(value)
                      }} />
                    </div>
                  </div>
                ))}

                <h4 style={styles.boldHeadingLeft}>Why flagged:</h4>
                {reasons.map((r, i) => (
                  <div key={i} style={{
                    background: "#fff3f3",
                    borderLeft: "4px solid red",
                    padding: 8,
                    marginBottom: 6
                  }}>
                    ⚠️ {r}
                  </div>
                ))}

                <h4 style={styles.boldHeadingLeft}>Action:</h4>
                <p>{action}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}