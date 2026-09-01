import styles from "../Styles/Footer.module.css";
import { useEffect, useState } from "react";
const Footer = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const day = dateTime.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const date = dateTime.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <footer className={styles.FooterContainer}>
      <div className={styles.LeftCon}>
        <span className={styles.Title}>Make today count.</span>
        <span className={styles.Subtitle}>Small steps. Big momentum.</span>
      </div>
      <div className={styles.CenterCon}>
        <span className={styles.Text}>
          Made by{" "}
          <a
            href="https://portfolio-alpha-two-4l3iyz4zzc.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prince Daksh
          </a>
        </span>
      </div>
      <div className={styles.RightCon}>
        <span className={styles.Text}>
          {day}, {date} | {time}
        </span>
      </div>
    </footer>
  );
};
export default Footer;
