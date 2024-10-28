import styles from "./index.module.css";
import heroImage from "./Images/img.png";
import backg from "./Images/img1.png"
const HeroAbout = () => {
    return(
        <div className={styles.mainContain}>
            <div>
                <img src={backg} className={styles.background}/>
            </div>
            <div className={styles.herodiv}>
                <div className={styles.heroWord}>
                    <p className={styles.subHead}>About NextCents</p>
                    <p className={styles.higherP}>Nextcents is a Swiss-based subsidiary of FiCAS AG and is focused on
                        issuing Crypto ETPs. <br/>
                        The company was founded in 2020 and has listed the world’s first actively managed <br/>
                        crypto ETP on the SIX Swiss Exchange. The company is one of the spearheading crypto ETP <br/>
                        issuers and pursues innovative and medium to long-term investment approaches. Thanks to <br/>
                        its central location in Crypto Valley, Nextcent has a very extensive network of <br/>
                        experts to list products on leading global exchanges in a tailored and efficient manner.</p>
                    <p className={styles.lowerP}>Our team consists of leading experts from traditional finance but also
                        from
                        the crypto <br/>
                        industry. This mix makes Bitcoin Capital not only unique but also enables the company to <br/>
                        bridge the gap between the two worlds, offering investors attractive investment <br/>
                        opportunities.</p>


                </div>
                <img src={heroImage} alt={""} className={styles.heroImage}/>

            </div>
        </div>
    );
}
export default HeroAbout;