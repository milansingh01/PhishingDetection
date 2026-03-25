import { useState } from "react";
import Header from "./Header";
import { styles } from "../styles/styles";
import { describeArc } from "../utils/arcUtils";

export default function Dashboard({
  setPage,
  currentOption,
  setCurrentOption,
}) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [risk, setRisk] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [status, setStatus] = useState("");
  const [reasons, setReasons] = useState([]);
  const [action, setAction] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const humanReasons = {
    suspiciousLink:
      "Phishing attempt detected. Banks never ask you to click links for verification.",
    shortenedUrl:
      "Shortened URLs hide destinations. Always hover to check real link.",
    passwordRequest:
      "Never share passwords/PINs. Legitimate banks never request these via email.",
    urgentLanguage:
      "Panic words like 'urgent' are scam tactics. Verify directly with bank.",
    unexpectedPrize:
      "Unexpected winnings are scams. You didn't enter any lottery.",
    genericGreeting: "Generic greetings like 'Dear Customer' are suspicious.",
  };

  const suspiciousWords = [
    "urgent",
    "verify",
    "password",
    "account suspended",
    "click here",
    "lottery",
  ];
  const suspiciousDomains = ["bit.ly", "tinyurl"];

  const analyze = () => {
    if (!text && !file) {
      alert("Please enter 'scan type' content to analyse risk.");
      return;
    }

    let score = 0;
    const reasonList = [];
    const lowerText = text.toLowerCase();

    if (text.includes("http") || text.includes("www")) {
      score += 30;
      reasonList.push(humanReasons.suspiciousLink);
    }
    if (suspiciousDomains.some((domain) => text.includes(domain))) {
      score += 25;
      reasonList.push(humanReasons.shortenedUrl);
    }
    if (lowerText.includes("password") || lowerText.includes("pin")) {
      score += 35;
      reasonList.push(humanReasons.passwordRequest);
    }
    if (suspiciousWords.some((word) => lowerText.includes(word))) {
      score += 20;
      reasonList.push(humanReasons.urgentLanguage);
    }
    if (lowerText.includes("lottery") || lowerText.includes("winner")) {
      score += 25;
      reasonList.push(humanReasons.unexpectedPrize);
    }
    if (
      lowerText.includes("dear customer") ||
      lowerText.includes("dear user")
    ) {
      score += 15;
      reasonList.push(humanReasons.genericGreeting);
    }

    if (score > 100) score = 100;
    setRisk(score);

    const riskConfigs = {
      0: {
        status: "SAFE - No Threats Detected",
        reasons: [
          "No Results - No phishing indicators found.",
          "Content is completely clean.",
        ],
        action:
          "Safe to proceed. Sender verification optional for trusted contacts.",
      },
      10: {
        status: "VERY LOW RISK",
        reasons: [
          "Minimal generic patterns detected.",
          "No actionable threats found.",
        ],
        action:
          "Safe with basic sender email verification (@barclays.com domain check).",
      },
      20: {
        status: "VERY LOW RISK",
        reasons: [
          "One minor suspicious pattern.",
          "No serious indicators present.",
        ],
        action: "Safe but verify sender email address carefully.",
      },
      30: {
        status: "LOW RISK",
        reasons: [
          "Low-level generic greeting detected.",
          "No links/password requests.",
        ],
        action: "Safe to open. Double-check sender before clicking anything.",
      },
      40: {
        status: "LOW RISK - Monitor",
        reasons: [
          "Minor suspicious words present.",
          "No critical threats detected.",
        ],
        action: "Verify sender then proceed with caution.",
      },
      50: {
        status: "MEDIUM RISK - Caution",
        reasons: [
          "Moderate suspicious patterns.",
          "Suspicious language detected.",
        ],
        action: "Do NOT click links. Call Barclays: 0345 734 5345 to verify.",
      },
      60: {
        status: "MEDIUM RISK - Suspicious",
        reasons: [
          "Multiple moderate indicators.",
          "Potential phishing attempt.",
        ],
        action: "Hold action. Contact Barclays directly via official channels.",
      },
      70: {
        status: "MEDIUM/HIGH RISK",
        reasons: [
          "Strong phishing indicators present.",
          "High caution required.",
        ],
        action:
          "Quarantine content. Forward to [phishing@barclays.com](mailto:phishing@barclays.com) for review.",
      },
      80: {
        status: "HIGH RISK - Phishing Likely",
        reasons:
          reasonList.length > 0
            ? reasonList
            : ["High-risk characteristics detected."],
        action:
          "Delete immediately. Forward to [phishing@barclays.com](mailto:phishing@barclays.com) NOW.",
      },
      90: {
        status: "HIGH RISK - Phishing Confirmed",
        reasons:
          reasonList.length > 0
            ? [...reasonList, "Multiple confirmed phishing markers."]
            : ["Confirmed phishing characteristics."],
        action:
          "URGENT: Delete + report to [phishing@barclays.com](mailto:phishing@barclays.com) immediately.",
      },
      100: {
        status: "CRITICAL RISK - DANGEROUS",
        reasons:
          reasonList.length > 0
            ? [...reasonList, "MAXIMUM phishing threat level."]
            : ["Critical phishing threat detected."],
        action:
          "EMERGENCY: Delete immediately. Report to Barclays Security NOW.",
      },
    };

    const riskKey = Math.round(score / 10) * 10;
    const config = riskConfigs[riskKey] || riskConfigs[0];

    setStatus(config.status);
    setReasons(config.reasons);
    setAction(config.action);
    setShowResult(true);
    setIsEditing(false);
  };

  const handleLogout = () => {
    setPage("login");
  };

  const getArcColor = (percent) => {
    if (percent <= 30) return "#2e7d32";
    if (percent <= 70) return "#ff9800";
    return "#d32f2f";
  };

  const selectOption = (newOption) => {
    setCurrentOption(newOption);
    setShowResult(false);
    setText("");
    setFile(null);
    setIsEditing(false);
    setSidebarOpen(false);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    if (showResult) {
      setIsEditing(true);
    }
  };

  const handleTextFocus = () => {
    if (showResult) {
      setIsEditing(true);
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <Header />
      <div style={styles.blueHeader}>
        <div style={styles.headerContent}>
          <span
            style={styles.hamburger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </span>
          <span style={styles.dashboardTitle}>Fraud Detection Dashboard</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div style={styles.sidebar}>
          <button
            style={styles.sidebarClose}
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
          {["Email Content", "URL", "Attachment", "Audio", "Prompt Text"].map(
            (item) => (
              <p
                key={item}
                style={styles.sidebarItem}
                onClick={() => selectOption(item)}
              >
                {item}
              </p>
            ),
          )}
        </div>
      )}

      <div style={styles.mainContent}>
        <button
          style={styles.crossBtn}
          onClick={() => {
            setCurrentOption("");
            setPage("select");
          }}
        >
          ×
        </button>

        {!showResult ? (
          <div style={styles.scanPanel()}>
            <div style={styles.centerContent}>
              <h2 style={styles.scanTypeTitle}>{currentOption}</h2>
              {(currentOption === "Email Content" ||
                currentOption === "URL" ||
                currentOption === "Prompt Text") && (
                <textarea
                  style={styles.textareaOptimized()}
                  placeholder="Paste content here for analysis..."
                  value={text}
                  onChange={handleTextChange}
                />
              )}
              {(currentOption === "Attachment" ||
                currentOption === "Audio") && (
                <>
                  <input
                    type="file"
                    style={styles.fileInput}
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                  {file && (
                    <div style={styles.fileBox}>
                      {file.name}
                      <button
                        style={styles.removeFile}
                        onClick={() => setFile(null)}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </>
              )}
              <div style={{ ...styles.btnSpacing, marginTop: "auto" }}>
                <button style={styles.primaryBtn} onClick={analyze}>
                  Analyze Risk
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.sideBySideContainer}>
            <div style={styles.scanPanelSide}>
              <div style={styles.centerContent}>
                <h2 style={styles.scanTypeTitle}>{currentOption}</h2>
                {(currentOption === "Email Content" ||
                  currentOption === "URL" ||
                  currentOption === "Prompt Text") && (
                  <>
                    <textarea
                      style={styles.textareaOptimized()}
                      value={text}
                      onChange={handleTextChange}
                      onFocus={handleTextFocus}
                    />
                    {isEditing && (
                      <div style={styles.btnSpacing}>
                        <button style={styles.primaryBtn} onClick={analyze}>
                          Analyze Risk Again
                        </button>
                      </div>
                    )}
                  </>
                )}
                {(currentOption === "Attachment" ||
                  currentOption === "Audio") && (
                  <>
                    <input
                      type="file"
                      style={styles.fileInput}
                      onChange={(event) => setFile(event.target.files[0])}
                    />
                    {file && (
                      <div style={styles.fileBox}>
                        {file.name}
                        <button
                          style={styles.removeFile}
                          onClick={() => setFile(null)}
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div style={styles.riskPanelSide}>
              <div style={styles.panelContent}>
                <h2 style={styles.riskAssessmentTitle}>Risk Assessment</h2>
                <div style={styles.semiCircleContainer}>
                  <svg width="160" height="95" viewBox="0 0 160 95">
                    <path
                      d="M 14 72 A 66 66 0 0 1 146 72"
                      fill="none"
                      stroke="#e0e0e0"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <path
                      d={describeArc(80, 72, 66, 0, (risk / 100) * 180)}
                      fill="none"
                      stroke={getArcColor(risk)}
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div style={styles.riskPercent}>{risk}%</div>
                </div>
                <h3 style={styles.statusHeading}>
                  Status: <span style={styles.statusText}>{status}</span>
                </h3>
                <h4 style={styles.boldHeadingLeft}>Reasons:</h4>
                {reasons.slice(0, 3).map((reason, index) => (
                  <p key={index} style={styles.reasonText}>
                    {reason}
                  </p>
                ))}
                <h4 style={styles.boldHeadingLeft}>Recommended Actions:</h4>
                <p style={styles.actionText}>{action}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
