import styles from "./index.module.css";
import background from "./images/img1.png";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <img className={styles.heroImage} src={background} alt="Hero Background" />
      <div className={styles.overlay}>
        <h1 className={styles.header}>
          Launch your crypto ETP when <br /> traditional diversification isn’t enough.
        </h1>
        <p className={styles.tail}>
          Benefit from our leading market knowledge and network to get your access to the world of cryptocurrencies. <br />
          We guide you through the launch of your crypto ETPs from start to finish and beyond.
        </p>
      </div>
    </div>
  );
};

export default Hero;
