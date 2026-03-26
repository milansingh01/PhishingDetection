import { useState } from "react";
import logoCenter from "../assets/logo.jpeg";
import Header from "./Header";
import { styles } from "../styles/styles";

export default function Login({ setPage, setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:9000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setRole(data.role);
        setPage("select");
      } else {
        setError(data.detail || "Invalid Credentials");
      }
    } catch {
      setError("Cannot connect to server. Is the backend running?");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <Header />
      <div style={styles.loginCard}>
        <img src={logoCenter} style={styles.centerLogoLarge} alt="center logo" />

        <h2 style={styles.title}>Barclays Secure Login</h2>

        <input
          placeholder="User ID"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.primaryBtn} onClick={handleLogin}>
          Login
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
