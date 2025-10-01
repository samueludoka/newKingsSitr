import styles from "./index.module.css";
import img1 from "./images/img.png";
import img2 from "./images/img_1.png";
import img3 from "./images/img_2.png";
import img4 from "./images/img_3.png";
import img5 from "./images/img_4.png";
import img6 from "./images/img_5.png";

const SecondHero = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.firstDiv}>
        <h1>Tailor-made crypto ETPs to meet your needs.</h1>
        <div className={styles.pdiv}>
          <p>
            As more and more alternative investments become available,
            investors are looking for next-level diversification. This is where
            Bitcoin Capital can accompany you and launch your own crypto ETP
            alongside you, so that you can focus on your core business.
          </p>
        </div>
      </div>

      <div className={styles.slider}>
        <div className={styles.slide}>
          <img src={img1} alt="Expansion" />
          <h3>Expansion</h3>
          <p>
            Conquer new markets by gaining access <br />
            to retail, professional and institutional <br />
            investors throughout Europe.
          </p>
        </div>

        <div className={styles.slide}>
          <img src={img2} alt="Configurability" />
          <h3>Configurability</h3>
          <p>
            Successfully launch your crypto ETP <br />
            according to your needs, profile and <br />
            strategies.
          </p>
        </div>

        <div className={styles.slide}>
          <img src={img3} alt="Regulated" />
          <h3>Regulated</h3>
          <p>
            Benefit from a professional issuance <br />
            in Switzerland within a regulated <br />
            environment.
          </p>
        </div>

        <div className={styles.slide}>
          <img src={img4} alt="Liquidity" />
          <h3>Liquidity</h3>
          <p>
            Enjoy the benefits of an ETP that can <br />
            be traded in unlimited quantities <br />
            during trading hours.
          </p>
        </div>

        <div className={styles.slide}>
          <img src={img5} alt="Transparency" />
          <h3>Transparency</h3>
          <p>
            Greatest transparency helps you stay <br />
            in control of your costs during the <br />
            launch of your crypto ETP.
          </p>
        </div>

        <div className={styles.slide}>
          <img src={img6} alt="Timing" />
          <h3>Timing</h3>
          <p>
            Take advantage of the momentum and <br />
            launch your crypto ETP in the shortest <br />
            time possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondHero;
