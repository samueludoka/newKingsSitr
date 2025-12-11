import styles from "./index.module.css";
import img1 from "./images/img.png";
import img2 from "./images/img_1.png";
import img3 from "./images/img_2.png";
import img4 from "./images/img_3.png";
import img5 from "./images/img_4.png";
import img6 from "./images/img_5.png";

const features = [
  {
    img: img1,
    title: "Expansion",
    desc: "Conquer new markets by gaining access to retail, professional and institutional investors throughout Europe."
  },
  {
    img: img2,
    title: "Configurability",
    desc: "Successfully launch your crypto ETP according to your needs, profile and strategies."
  },
  {
    img: img3,
    title: "Regulated",
    desc: "Benefit from a professional issuance in Switzerland within a regulated environment."
  },
  {
    img: img4,
    title: "Liquidity",
    desc: "Enjoy the benefits of an ETP that can be traded in unlimited quantities during trading hours."
  },
  {
    img: img5,
    title: "Transparency",
    desc: "Greatest transparency helps you stay in control of your costs during the launch of your crypto ETP."
  },
  {
    img: img6,
    title: "Timing",
    desc: "Take advantage of the momentum and launch your crypto ETP in the shortest time possible."
  }
];

const SecondHero = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.firstDiv}>
        <h1>Tailor-made crypto ETPs to meet your needs.</h1>
        <div className={styles.pdiv}>
          <p>
            As more and more alternative investments become available, investors
            are looking for next-level diversification. This is where Bitcoin
            Capital can accompany you and launch your own crypto ETP alongside
            with you, so that you can focus on your core business.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {features.map((f, i) => (
          <div
            key={i}
            className={`${styles.card} ${styles[`delay${i + 1}`]}`}
          >
            <img src={f.img} alt={f.title} className={styles.icon} />
            <div className={styles.text}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondHero;
