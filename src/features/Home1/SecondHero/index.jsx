import styles from "./index.module.css";
import img1 from "./images/img.png";
import img2 from "./images/img_1.png";
import img3 from "./images/img_2.png";
import img4 from "./images/img_3.png";
import img5 from "./images/img_4.png";
import img6 from "./images/img_5.png";
const SecondHero = () =>{
    return (
        <div className={styles.mainContent} >
            <div className={styles.firstDiv}>
                <h1>Tailor-made crypto ETPs to meet your needs.</h1>
                <div className={styles.pdiv}>
                    <p>As more and more alternative investments become available, investors are looking for next-level diversification.
                        This is where Bitcoin Capital can accompany you and launch your own crypto ETP alongside with you, so that you can focus on your core business.</p>
                </div>
            </div>
            <div className={styles.secondDiv}>
                <div className={styles.firstRow}>
                    <div className={styles.bill1}>
                        <img src={img1} alt={""} className={styles.img1}/>
                        <div className={styles.text1}>
                            <h3>Expansion</h3>
                            <p>Conquer new markets,<br/>by gaining access to retail,<br/>professional and
                                institutional<br/>investors throughout Europe.</p>
                        </div>
                    </div>

                    <div className={styles.bill2}>
                        <img src={img2} alt={""} className={styles.img2}/>
                        <div className={styles.text1}>
                            <h3>Configurability</h3>
                            <p>Successfully launch your <br/>crypto ETP according <br/>to your needs, profile <br/>and
                                strategies.</p>
                        </div>
                    </div>

                    <div className={styles.bill3}>
                        <img src={img3} alt={""} className={styles.img3}/>
                        <div className={styles.text1}>
                            <h3>Regulated</h3>
                            <p>Benefit from a professional <br/>issuance in Switzerland <br/>within a regulated <br/>environment..
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.secondRow}>
                    <div className={styles.bill4}>
                        <img src={img4} alt={""} className={styles.img4}/>
                        <div className={styles.text1}>
                            <h3>Liquidity</h3>
                            <p>Enjoy the benefits of an <br/>ETP that can be traded <br/>in unlimited quantities <br/>during trading hours.</p>
                        </div>
                    </div>

                    <div className={styles.bill5}>
                        <img src={img5} alt={""} className={styles.img5}/>
                        <div className={styles.text1}>
                            <h3>Transparency</h3>
                            <p>Greatest transparency,<br/>helps you stay in control <br/>of your costs during the <br/>launch of your crypo ETP.</p>
                        </div>
                    </div>

                    <div className={styles.bill6}>
                        <img src={img6} alt={""} className={styles.img6}/>
                        <div className={styles.text1}>
                            <h3>Timing</h3>
                            <p>Take advantage of the momentum <br/>and launch your crypto ETP <br/>in the shortest time <br/>possible.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default SecondHero;