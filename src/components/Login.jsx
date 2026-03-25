import { useState } from "react";
import logoCenter from "../assets/logo.jpeg";
import Header from "./Header";
import { styles } from "../styles/styles";

export default function Login({ setPage, setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = [
    { username: "admin", password: "1234", role: "user" },
    { username: "user", password: "pass", role: "user" },
    { username: "superadmin", password: "admin123", role: "admin" },
  ];

  const handleLogin = () => {
    const found = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (found) {
      setRole(found.role);
      setPage("select");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <Header />
      <div style={styles.loginCard}>
        <img
          src={logoCenter}
          style={styles.centerLogoLarge}
          alt="center logo"
        />
        <h2 style={styles.title}>Barclays Secure Login</h2>
        <input
          placeholder="User ID"
          style={styles.input}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button style={styles.primaryBtn} onClick={handleLogin}>
          Login
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
