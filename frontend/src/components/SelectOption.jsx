import Header from "./Header";
import { styles } from "../styles/styles";

export default function SelectOption({ setPage, setCurrentOption }) {
  return (
    <div style={styles.selectContainer}>
      <Header />
      <div style={styles.selectCard}>
        <h2 style={styles.formalFont}>Select Scan Type</h2>
        {["Email Content", "URL", "Attachment", "Audio", "Prompt Text"].map(
          (item) => (
            <button
              key={item}
              style={styles.selectBtn}
              onClick={() => {
                setCurrentOption(item);
                setPage("dashboard");
              }}
            >
              {item}
            </button>
          ),
        )}
      </div>
    </div>
  );
}