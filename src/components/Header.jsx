import logoTop from "../assets/logo2.jpeg";
import { styles } from "../styles/styles";

export default function Header() {
  return (
    <div style={styles.header}>
      <img src={logoTop} alt="logo" style={styles.leftLogo} />
    </div>
  );
}
