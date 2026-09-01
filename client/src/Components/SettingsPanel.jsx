import { useState } from "react";
import styles from "../Styles/SettingsPanel.module.css";

const SettingsPanel = ({
  isOpen,
  onClose,
  darkMode,
  onToggleDarkMode,
  theme,
  onThemeChange,
  userName,
  onUpdateUserName,
}) => {
  const [nameDraft, setNameDraft] = useState(userName || "");
  const [quoteSource, setQuoteSource] = useState("Daily mix");
  const [notifications, setNotifications] = useState(true);

  const handleNameUpdate = () => {
    const didUpdate = onUpdateUserName(nameDraft);

    if (didUpdate) {
      setNameDraft(nameDraft.trim());
    }
  };

  return (
    <aside
      className={`${styles.panel} ${isOpen ? styles.open : ""}`}
      aria-label="Settings panel"
    >
      <div className={styles.header}>
        <div>
          <p className={styles.label}>Settings</p>
          <h3 className={styles.title}>Customize your flow</h3>
        </div>

        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close settings"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.profileRow}>
          <label htmlFor="settings-username">Your name</label>
          <div className={styles.profileControls}>
            <input
              id="settings-username"
              type="text"
              value={nameDraft}
              onChange={(event) => setNameDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleNameUpdate();
              }}
              className={styles.nameInput}
              maxLength={40}
            />
            <button
              type="button"
              className={styles.updateButton}
              onClick={handleNameUpdate}
            >
              Update
            </button>
          </div>
        </div>

        <div className={styles.optionRow}>
          <span>Theme switch</span>

          <select
            value={theme}
            onChange={(event) => onThemeChange(event.target.value)}
            className={styles.select}
          >
            <option value="soft-indigo">Soft Indigo</option>
            <option value="violet-glow">Violet Glow</option>
            <option value="minimal-light">Minimal Light</option>
            <option value="ocean">Ocean</option>
            <option value="forest">Forest</option>
            <option value="sunset">Sunset</option>
            <option value="rose">Rose</option>
            <option value="amber">Amber</option>
            <option value="emerald">Emerald</option>
            <option value="graphite">Graphite</option>
            <option value="midnight">Midnight</option>
            <option value="cyber">Cyber</option>
            <option value="coffee">Coffee</option>
          </select>
        </div>

        <div className={styles.optionRow}>
          <span>Quote source</span>

          <select
            value={quoteSource}
            onChange={(event) => setQuoteSource(event.target.value)}
            className={styles.select}
          >
            <option value="Daily mix">Daily mix</option>
            <option value="Motivational">Motivational</option>
            <option value="Wisdom">Wisdom</option>
            <option value="Focus">Focus</option>
          </select>
        </div>

        <div className={styles.optionRow}>
          <span>Notifications</span>

          <button
            type="button"
            className={`${styles.toggle} ${notifications ? styles.on : ""}`}
            onClick={() => setNotifications((current) => !current)}
            aria-label="Toggle notifications"
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <div className={styles.optionRow}>
          <span>Dark mode</span>

          <button
            type="button"
            className={`${styles.toggle} ${darkMode ? styles.on : ""}`}
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SettingsPanel;
