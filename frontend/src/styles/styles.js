export const getSecurityColor = (score) => {
  if (score === null || score === undefined) return "#CCC";
  const numScore = Number(score);
  if (numScore < 30) return "#4CAF50";
  if (numScore <= 70) return "#FF9800";
  return "#E53935";
};

export const styles = {
  formalFont: {
    fontFamily: "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: 300,
    fontSize: 18,
    textAlign: "center",
  },

  dashboardTitle: {
    fontSize: 20,
    fontWeight: 300,
    fontFamily: "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    flex: 1,
  },

  headerContent: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: "12px",
  },

  logoutBtn: {
    background: "rgba(255,255,255,0.2)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "6px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "'Segoe UI', sans-serif",
    marginRight: "15px",
  },

  scanTypeTitle: {
    fontFamily: "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: 300,
    fontSize: 22,
    textAlign: "center",
    marginBottom: 12,
    marginTop: 0,
    width: "100%",
  },

  riskAssessmentTitle: {
    fontFamily: "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: 300,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
    marginTop: 1,
  },

  boldHeadingLeft: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: "bold",
    fontSize: 16,
    margin: "10px 0 4px 0",
    textAlign: "left",
  },

  statusHeading: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: "bold",
    fontSize: 16,
    margin: "12px 0 4px 0",
    textAlign: "left",
  },

  statusText: {
    fontWeight: "normal",
    color: "#d32f2f",
    fontSize: 16,
  },

  reasonText: {
    marginTop: 6,
    fontSize: 16,
    color: "#444",
    textAlign: "left",
    fontWeight: "normal",
    lineHeight: 1.3,
  },

  actionText: {
    marginTop: 3,
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 1.3,
    textAlign: "left",
  },

  sideBySideContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: 820,
    height: "100%",
  },

  scanPanelSide: {
    flex: 1,
    width: 450,
    height: 500,
    background: "#fff",
    padding: 28,
    borderRadius: 18,
    boxShadow: "0 12px 36px rgba(0,0,0,0.16)",
    display: "flex",
    flexDirection: "column",
  },

  riskPanelSide: {
    flex: 1,
    width: 450,
    height: 500,
    background: "#fff",
    padding: 28,
    borderRadius: 18,
    boxShadow: "0 12px 36px rgba(0,0,0,0.16)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  scanPanel: {
    width: 600,
    height: 500,
    maxHeight: "calc(100vh - 140px)",
    background: "#fff",
    padding: 24,
    borderRadius: 21,
    boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
  },

  textareaOptimized: {
    flex: 1,
    minHeight: 120,
    width: "100%",
    marginTop: 1,
    padding: 18,
    border: "1px solid #ddd",
    borderRadius: 18,
    resize: "none",
    fontSize: 14,
    boxSizing: "border-box",
    fontFamily: "'Courier New', monospace",
    lineHeight: 1.4,
    textAlign: "left",
    display: "block",
  },

  loginContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f0f6ff 0%, #e3f2fd 100%)",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },

  selectContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f0f6ff 0%, #e3f2fd 100%)",
    margin: 0,
    padding: 0,
  },

  dashboardContainer: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg, #f0f6ff 0%, #e3f2fd 100%)",
    margin: 0,
    padding: 0,
    position: "relative",
    overflow: "hidden",
  },

  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    background: "white",
    padding: "12px 22px",
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    alignItems: "center",
    zIndex: 1000,
    boxSizing: "border-box",
  },

  blueHeader: {
    position: "fixed",
    top: "65px",
    left: 0,
    width: "100vw",
    background: "#004a8f",
    padding: "10px 16px",
    color: "white",
    zIndex: 999,
    boxSizing: "border-box",
  },

  leftLogo: { height: 42 },

  centerLogoLarge: {
    height: 100,
    width: "auto",
    marginBottom: 1,
    display: "block",
    margin: "0 auto",
  },

  loginCard: {
    background: "white",
    padding: 24,
    width: 420,
    maxWidth: "85vw",
    borderRadius: 16,
    textAlign: "center",
    boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
  },

  selectCard: {
    background: "white",
    padding: 28,
    width: 380,
    maxWidth: "85vw",
    borderRadius: 16,
    textAlign: "center",
    boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
  },

  title: {
    color: "#004a8f",
    marginBottom: 20,
    fontSize: 22,
    fontFamily: "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: 300,
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: 14,
    marginBottom: 12,
    border: "1px solid #ddd",
    borderRadius: 10,
    fontSize: 15,
    boxSizing: "border-box",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  selectBtn: {
    width: "100%",
    padding: 14,
    background: "#f8f9fa",
    color: "#333",
    border: "2px solid #e9ecef",
    margin: "8px 0",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 15,
    fontFamily: "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    background: "#004a8f",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 300,
    fontFamily: "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    marginTop: 8,
  },

  hamburger: {
    fontSize: 22,
    cursor: "pointer",
    padding: "5px 8px",
    borderRadius: 5,
  },

  sidebar: {
    position: "fixed",
    top: "88px",
    left: 0,
    width: 240,
    height: "calc(100vh - 88px)",
    background: "white",
    boxShadow: "3px 0 16px rgba(0,0,0,0.1)",
    zIndex: 1001,
    padding: "16px",
  },

  sidebarClose: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: 18,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
  },

  sidebarItem: {
    padding: "14px 10px",
    cursor: "pointer",
    borderBottom: "1px solid #f0f0f0",
    margin: 0,
    fontSize: 18,
    fontWeight: 500,
    fontFamily: "'Segoe UI Light', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  mainContent: {
    marginTop: "110px",
    padding: "20px 16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
    height: "calc(100vh - 110px)",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  crossBtn: {
    position: "fixed",
    top: "74px",
    right: "20px",
    fontSize: 20,
    background: "rgba(255,255,255,0.95)",
    border: "none",
    borderRadius: "50%",
    width: 38,
    height: 38,
    cursor: "pointer",
    zIndex: 100,
  },

  centerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    gap: 10,
  },

  panelContent: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    paddingRight: 3,
  },

  fileInput: {
    width: "100%",
    padding: 16,
    marginTop: 12,
    border: "1px solid #ddd",
    borderRadius: 10,
    background: "#f8f9fa",
    textAlign: "center",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  btnSpacing: {
    marginTop: 16,
    width: "100%",
  },

  fileBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f8f9fa",
    padding: 14,
    marginTop: 12,
    borderRadius: 10,
    fontSize: 14,
  },

  removeFile: {
    border: "none",
    background: "transparent",
    fontSize: 16,
    cursor: "pointer",
    color: "#666",
  },

  semiCircleContainer: {
    margin: "12px auto",
    textAlign: "center",
    position: "relative",
    height: 110,
    width: 180,
  },

  riskPercent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },

  error: {
    color: "#d32f2f",
    marginTop: 8,
    fontSize: 14,
    fontWeight: 500,
    textAlign: "center",
  },
};