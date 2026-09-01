import { useState } from "react";
import styles from "../Styles/Welcome.module.css";

const Welcome = ({ setUserName }) => {
  const [name, setName] = useState("");

  const handleContinue = () => {
    const cleanName = name.trim();

    if (!cleanName) return;

    localStorage.setItem("userName", cleanName);
    setUserName(cleanName);
  };

  return (
    <div className={styles.Welcome}>
      <div className={styles.Card}>
        <h1>Welcome to TabRise ✨</h1>

        <p>What should we call you?</p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleContinue();
            }
          }}
        />

        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
};

export default Welcome;
