import styles from "./index.module.css";
import img1 from "./image/img.png";
import img2 from "./image/img_1.png";
import img3 from "./image/img_2.png";
import img4 from "./image/img_3.png";

const ThirdHero = () => {
  const team = [
    { img: img1, name: "Marcel Niederberger", title: "Chief Executive Officer" },
    { img: img2, name: "Olga Vöegli", title: "Chief Financial Officer" },
    { img: img3, name: "Janina Vinklere", title: "Head of Marketing" },
    { img: img4, name: "Alexander Graf", title: "Head of Distribution" }
  ];

  return (
    <div className={styles.mainContent}>
      <h1 className={styles.firstWord}>Team</h1>

      <div className={styles.grid}>
        {team.map((member, i) => (
          <div key={i} className={styles.card}>
            <img src={member.img} alt={member.name} className={styles.avatar} />
            <p className={styles.fname}>{member.name}</p>
            <p className={styles.title}>{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdHero;
