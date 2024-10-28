import styles from "./index.module.css";
import illust from "./images/imd2.png"
const PrefixHero = () => {
    return (
        <div className={styles.mainContent}>
            <div className={styles.word}>
                <h1>Ready to be in the driver’s seat of next-gen diversification?</h1>
                <p>Contact us today from any part of the globe so that we <br/>can access your requirements in an initial meeting  so that <br/>nothing
                    stands in the way of launching your crypto ETP!</p>
            </div>
            <img src={illust} alt={""} className={styles.illustration}/>
        </div>
    );
}

export default PrefixHero;
