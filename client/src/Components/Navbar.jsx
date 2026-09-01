import { useEffect, useState } from "react";
import styles from "../Styles/Navbar.module.css";
import { getQuote } from "../Services/GetQuotes.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faGear, faRotate } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ onRefresh }) => {
  const [favouriteCount, setFavouriteCount] = useState(0);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

    setFavouriteCount(favourites.length);
  }, []);

  return (
    <nav className={styles.NavContainer}>
      <div className={styles.LeftCon}>
        <div className={styles.logoContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            <path d="M20 2v4" />
            <path d="M22 4h-4" />
            <circle cx="4" cy="20" r="2" />
          </svg>
        </div>

        <span className={styles.TextCon}>TabRise.</span>
      </div>

      <div className={styles.RightCon}>
        <button className={styles.IconButton} aria-label="Bookmarks">
          <FontAwesomeIcon icon={faBookmark} />

          <span className={styles.FavouriteText}>Favourites</span>

          <span className={styles.Count}>{favouriteCount}</span>
        </button>

        <button className={styles.IconButton} aria-label="Settings">
          <FontAwesomeIcon icon={faGear} />
        </button>

        <button
          className={styles.IconButton}
          onClick={onRefresh}
          aria-label="Refresh"
        >
          <FontAwesomeIcon icon={faRotate} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
