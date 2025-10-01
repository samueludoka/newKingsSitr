import styles from "./index.module.css";
import heroImage from "./Images/img.png";

const HeroAbout = () => {
    return (
        <section className={styles.mainContain}>
            <div className={styles.overlay}></div>
            <div className={styles.herodiv}>
                <div className={styles.heroWord}>
                    <p className={styles.subHead}>About NextCents</p>
                    <p className={styles.higherP}>
                        Nextcents is a Swiss-based subsidiary of FiCAS AG and is focused 
                        on issuing Crypto ETPs. Founded in 2020, it listed the world’s 
                        first actively managed crypto ETP on the SIX Swiss Exchange. 
                        The company spearheads innovative, medium to long-term investment 
                        approaches, leveraging its central location in Crypto Valley to 
                        efficiently list products on leading global exchanges.
                    </p>
                    <p className={styles.lowerP}>
                        Our team consists of leading experts from both traditional finance 
                        and the crypto industry. This unique mix allows Bitcoin Capital 
                        to bridge the gap between the two worlds, offering investors 
                        attractive investment opportunities.
                    </p>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={heroImage} alt="About NextCents" className={styles.heroImage}/>
                </div>
            </div>
        </section>
    );
};

export default HeroAbout;
