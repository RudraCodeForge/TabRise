import { Link } from "react-router-dom";
import { useMemo } from "react";
import styles from "../Styles/Favourites.module.css";
import Footer from "../Components/Footer";

const Favourites = ({
  favourites = [],
  onRemoveFavourite,
  onCopyQuote,
  onShareQuote,
}) => {
  const totalSaved = useMemo(() => favourites.length, [favourites]);

  const handleCopy = async (quote) => {
    await onCopyQuote?.(quote);
  };

  const handleShare = async (quote) => {
    await onShareQuote?.(quote);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <Link to="/" className={styles.backLink}>
            ← Back
          </Link>

          <div className={styles.titleWrap}>
            <p className={styles.kicker}>Saved inspiration</p>
            <h1 className={styles.heading}>Your favourites</h1>
          </div>

          <div className={styles.countBadge}>{totalSaved}</div>
        </div>

        {favourites.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No quotes saved yet.</p>
            <Link to="/" className={styles.emptyLink}>
              Discover quotes
            </Link>
          </div>
        ) : (
          <div className={styles.cardGrid}>
            {favourites.map((quote, index) => (
              <article
                key={`${quote.q}-${quote.a}-${index}`}
                className={styles.quoteCard}
              >
                <div className={styles.cardTop}>
                  <span className={styles.quoteTag}>Saved quote</span>
                  <span className={styles.cardIndex}>#{index + 1}</span>
                </div>

                <p className={styles.quoteText}>“{quote.q}”</p>
                <span className={styles.author}>— {quote.a}</span>

                <div className={styles.actions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleCopy(quote)}
                  >
                    Copy
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleShare(quote)}
                  >
                    Share
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.removeButton}`}
                    onClick={() => onRemoveFavourite?.(quote)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Favourites;
