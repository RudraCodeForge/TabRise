import styles from "../Styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faRotate, faShareNodes } from "@fortawesome/free-solid-svg-icons";
const Home = ({ quote, onRefresh }) => {
  const Name = localStorage.getItem("userName");

  const time = new Date().getHours();

  let greeting = "";

  if (time < 12) {
    greeting = "Good Morning";
  } else if (time < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div className={styles.home}>
      <span className={styles.badge}>YOUR DAILY RESET</span>

      <p className={styles.greeting}>
        {greeting}, {Name}!
      </p>

      {quote && (
        <div className={styles.quoteContainer}>
          <p className={styles.quote}>"{quote.q}"</p>

          <span className={styles.author}>— {quote.a}</span>
        </div>
      )}
      <div className={styles.ButtonContainer}>
        <button className={styles.Button}>
          <FontAwesomeIcon icon={faHeart} />
          <span className={styles.ButtonText}>Favourites</span>
        </button>
        <button className={styles.Button} onClick={onRefresh}>
          <FontAwesomeIcon icon={faRotate} />
          <span className={styles.ButtonText}>New Quote</span>
        </button>
        <button className={styles.Button}>
          <FontAwesomeIcon icon={faClipboard} />
          <span className={styles.ButtonText}>Copy Quote</span>
        </button>
        <button className={styles.Button}>
          <FontAwesomeIcon icon={faShareNodes} />
          <span className={styles.ButtonText}>Share</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
