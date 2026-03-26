import { useState, useEffect } from "react"; 
import Header from "./Header";
import { styles } from "../styles/styles";

export default function Admin() {
  // 2. Define the state to store the logs
  const [logs, setLogs] = useState([]);

  // 3. Move useEffect inside the component
  useEffect(() => {
    fetch("http://127.0.0.1:9000/admin/logs")
      .then((res) => res.json())
      .then((data) => {
        // Handle data whether it's an array or an object
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
          <p><strong>System Monitoring:</strong> Active</p>
          <p><strong>User Management:</strong> 5 Users</p>
          
          <h4 style={{ marginTop: '20px' }}>Security Logs:</h4>
          {/* 4. Actually display the logs from the backend */}
          <div style={{ maxHeight: '200px', overflowY: 'auto', fontSize: '12px' }}>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <p key={index} style={{ borderBottom: '1px solid #eee' }}>
                  {log.message || JSON.stringify(log)}
                </p>
              ))
            ) : (
              <p>No recent security logs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
