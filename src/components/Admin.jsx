import Header from "./Header";
import { styles } from "../styles/styles";

export default function Admin() {
  return (
    <div style={styles.loginContainer}>
      <Header />
      <div style={styles.loginCard}>
        <h2 style={styles.formalFont}>Admin Control Panel</h2>
        <p>System Monitoring</p>
        <p>User Management</p>
        <p>Security Logs</p>
      </div>
    </div>
  );
}
