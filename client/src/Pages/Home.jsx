import styles from "../Styles/Home.module.css";

const Home = ({ quote }) => {
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
    </div>
  );
};

export default Home;
