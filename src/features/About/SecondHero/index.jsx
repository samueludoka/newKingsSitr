import styles from "./index.module.css";
import customer from "./images/img.png";
import professional from "./images/img_1.png"

const SecondHero = () =>{
    return(
        <div className={styles.mainContent}>
            <div className={styles.firstDiv}>
                <div className={styles.Vision}>
                    <p className={styles.subHead}>Vision</p>
                    <p className={styles.tail}>To become the first point of contact for innovative crypto products.</p>
                </div>

                <div className={styles.Mission}>
                    <p className={styles.subHead}>Mission</p>
                    <p className={styles.tail}>Building Paths. Enhancing Value. Embracing Crypto.</p>
                </div>
            </div>

            <div className={styles.secondDiv}>

                <div className={styles.Centric}>
                    <div className={styles.imgDiv}>
                        <img src={customer} alt={""} className={styles.customer}/>
                    </div>
                    <div className={styles.CentricWord}>
                        <p className={styles.subHead}>Customer Centric</p>
                        <p className={styles.tail}>* We constantly act in the best interest of our customers.<br/>
                            * We challenge the status quo and offer innovative tailor-made solutions.<br/>
                            * We implement our projects on time and serve our customers beyond that.</p>
                    </div>
                </div>

                <div className={styles.scent}>
                    <div className={styles.imgDiv}>
                        <img src={professional} alt={""} className={styles.professional}/>
                    </div>

                    <div className={styles.scentWord}>
                        <p className={styles.subHead}>Professional</p>
                        <p className={styles.tail}>* We behave professionally and treat each other equal with respect and
                            est eem.<br/>
                            * We stand by our words and take responsibility for every detail.<br/>
                            * We always strive for the highest quality in the interest of our stakeholders.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default SecondHero;