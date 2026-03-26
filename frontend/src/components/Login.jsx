import { useState } from "react";
import logoCenter from "../assets/logo.jpeg";
import Header from "./Header";
import { styles } from "../styles/styles";

export default function Login({ setPage, setRole }) {
  // 1. Use 'email' instead of 'username' to match the backend expectation
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:9000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 2. This now correctly sends the email state
        body: JSON.stringify({ email, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        // 🔥 This saves the 'user' object from auth_routes.py
        localStorage.setItem("user", JSON.stringify(data.user));
        setPage("dashboard");
      } else {
        alert(data.detail || "Login Failed");
      }
    } catch (error) {
      alert("Backend is not responding. Check port 9000.");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <Header />
      <div style={styles.loginCard}>
        <img src={logoCenter} style={styles.centerLogoLarge} alt="logo" />
        <h2 style={styles.title}>Barclays Secure Login</h2>

        <input
          placeholder="Barclays Email"
          style={styles.input}
          value={email} // 3. Updated to email
          onChange={(e) => setEmail(e.target.value)}
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
      </div>
    </div>
  );
}