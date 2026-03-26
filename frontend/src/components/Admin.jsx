import { useState, useEffect } from "react"; 
import Header from "./Header";
import { styles } from "../styles/styles";

export default function Admin() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // 🔥 Make sure this matches your backend route for getting all scans
    fetch("http://127.0.0.1:9000/admin/logs") 
      .then((res) => res.json())
      .then((data) => {
        // Ensure we handle the data correctly
        setLogs(Array.isArray(data) ? data : []); 
      })
      .catch((err) => console.error("Admin fetch error:", err));
  }, []);

  return (
    <div style={styles.loginContainer}>
      <Header />
      <div style={styles.loginCard}>
        <h2 style={styles.formalFont}>Admin Control Panel</h2>
        
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
          <p><strong>System Monitoring:</strong> <span style={{color: 'green'}}>Active</span></p>
          <p><strong>Total Scans Recorded:</strong> {logs.length}</p>
          
          <h4 style={{ marginTop: '20px', borderBottom: '2px solid #333', paddingBottom: '5px' }}>
            Live Security Logs:
          </h4>

          <div style={{ maxHeight: '300px', overflowY: 'auto', fontSize: '13px', background: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
            {logs.length > 0 ? (
              // Reverse the logs so the newest scan is at the top
              [...logs].reverse().map((log, index) => (
                <div key={index} style={{ 
                  padding: '8px 0', 
                  borderBottom: '1px solid #ddd',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold', color: '#d32f2f' }}>
                      {log.fraud_status || "Unknown"} Detected
                    </span>
                    <span style={{ color: '#666', fontSize: '11px' }}>
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <span style={{ color: '#333' }}>
                    <strong>User:</strong> {log.employee_name} ({log.email_id})
                  </span>
                  <span style={{ fontSize: '11px', color: '#555', fontStyle: 'italic' }}>
                    Result: {log.system_decision}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#999' }}>No recent security logs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}