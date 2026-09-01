import styles from "../Styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartRegular,
  faClipboard,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faRotate,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Home = ({ quote, onRefresh, onFavourite, onCopyQuote, onShareQuote }) => {
  const Name = localStorage.getItem("userName");
  const [isFavourite, setIsFavourite] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy Quote");
  const [shareLabel, setShareLabel] = useState("Share");

  const time = new Date().getHours();

  let greeting = "";

  if (time < 12) {
    greeting = "Good Morning";
  } else if (time < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  useEffect(() => {
    if (!quote) {
      setIsFavourite(false);
      return;
    }

    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    const saved = favourites.some(
      (item) => item.q === quote.q && item.a === quote.a,
    );

    setIsFavourite(saved);
  }, [quote]);

  const handleFavourite = () => {
    if (quote) {
      onFavourite?.(quote);
      setIsFavourite(true);
    }
  };

  const handleCopy = async () => {
    if (quote) {
      await onCopyQuote?.(quote);
      setCopyLabel("Copied");

      window.clearTimeout(handleCopy.timeoutId);
      handleCopy.timeoutId = window.setTimeout(() => {
        setCopyLabel("Copy Quote");
      }, 1200);
    }
  };

  const handleShare = async () => {
    if (quote) {
      await onShareQuote?.(quote);
      setShareLabel("Shared");

      window.clearTimeout(handleShare.timeoutId);
      handleShare.timeoutId = window.setTimeout(() => {
        setShareLabel("Share");
      }, 1200);
    }
  };

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
        <button
          className={`${styles.Button} ${isFavourite ? styles.FavouriteActive : ""}`}
          onClick={handleFavourite}
        >
          <FontAwesomeIcon icon={isFavourite ? faHeartSolid : faHeartRegular} />
          <span className={styles.ButtonText}>Favourites</span>
        </button>
        <button className={styles.Button} onClick={onRefresh}>
          <FontAwesomeIcon icon={faRotate} />
          <span className={styles.ButtonText}>New Quote</span>
        </button>
        <button
          className={`${styles.Button} ${copyLabel === "Copied" ? styles.ActionActive : ""}`}
          onClick={handleCopy}
        >
          <FontAwesomeIcon icon={faClipboard} />
          <span className={styles.ButtonText}>{copyLabel}</span>
        </button>
        <button
          className={`${styles.Button} ${shareLabel === "Shared" ? styles.ActionActive : ""}`}
          onClick={handleShare}
        >
          <FontAwesomeIcon icon={faShareNodes} />
          <span className={styles.ButtonText}>{shareLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
