import styles from "./index.module.css";
import img1 from "./image/img.png";
import img2 from "./image/img_1.png";
import img3 from "./image/img_2.png";
import img4 from "./image/img_3.png";
const ThirdHero = () =>{
    return(
        <div className={styles.mainContent}>
            <div className={styles.firstWord}>
                <h1>Team</h1>
            </div>
            <div className={styles.innerDiv}>
                <div className={styles.firstProf}>
                    <img src={img1} alt={""} className={styles.img1}/>
                    <p className={styles.fname}>Marcel Niederberger</p>
                    <p className={styles.title}>Chief Executive Officer</p>
                </div>

                <div className={styles.secondProf}>
                    <img src={img2} alt={""} className={styles.img2}/>
                    <p className={styles.fname}>Olga Vöegli</p>
                    <p className={styles.title}>Chief Financial Officer</p>
                </div>

                <div className={styles.thirdProf}>
                    <img src={img3} alt={""} className={styles.img3}/>
                    <p className={styles.fname}>Janina Vinklere</p>
                    <p className={styles.title}>Head of Marketing</p>
                </div>

                <div className={styles.forthProf}>
                    <img src={img4} alt={""} className={styles.img4}/>
                    <p className={styles.fname}>Alexander Graf</p>
                    <p className={styles.title}>Head of Distribution</p>
                </div>
            </div>
        </div>
    );
}
export default ThirdHero;