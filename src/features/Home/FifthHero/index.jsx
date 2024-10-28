
import styles from "./index.module.css";
import graph from "./Images/img-removebg-preview.png";
import award from "./Images/1018789-200-removebg-preview.png";
import happy from "./Images/image-removebg-preview.png";
import account from "./Images/img_2-removebg-preview.png";
import rate from "./Images/image-removebg-preview (2).png";
import Counter from "../../../component/Reuseables/Counter";

const FifthHero = () => {
    return(
        <div className={styles.mainContent}>
            <div className={styles.div1}>
                <h1>Bitcoin Growth Schedule</h1>
                <h3>Bitcoin (BTC) growth per day from January 2023 to December, 2023.</h3>
                <img src={graph} alt={""} className={styles.graph}/>
            </div>

            <div className={styles.div2}>
                <div className={`${styles.row} ${styles.firstRow}`}>
                    <img src={award} alt={""} className={styles.award}/>
                    <h1>AWARDS <Counter start={0} end={75} duration={3000}/></h1>
                </div>

                <div className={`${styles.row} ${styles.secondRow}`}>
                    <img src={happy} alt={""} className={styles.happy}/>
                    <h1>HAPPY CLIENTS <Counter start={0} end={45612} duration={3000}/></h1>
                </div>

                <div className={`${styles.row} ${styles.thirdRow}`}>
                    <img src={account} alt={""} className={styles.account}/>
                    <h1>ACTIVE ACCOUNTS <Counter start={0} end={19367} duration={3000}/></h1>
                </div>

                <div className={`${styles.row} ${styles.fourthRow}`}>
                    <img src={rate} alt={""} className={styles.rate}/>
                    <h1>TOTAL RATE <br/><Counter start={0} end={16211} duration={3000}/></h1>
                </div>
            </div>
        </div>
    );
}
export default FifthHero;
