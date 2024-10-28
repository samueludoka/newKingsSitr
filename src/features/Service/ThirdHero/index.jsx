// import styles from "./index.module.css";
// import img1 from "./Images/img1.png";
// import img2 from "./Images/img_1.png";
// import arrow from "./Images/img_2.png"
//
//
// const ThirdHero = () => {
//     return(
//         <div className={styles.mainContent}>
//             <div className={styles.firstDiv}>
//                 <h1>How It Works</h1>
//                 <p>At Nextcent, we make it as simple as possible to deposit, earn and withdraw. If you have <br/> any other questions, visit our FAQs or chat to our team.</p>
//             </div>
//
//             <div className={styles.secondDiv}>
//                 <div className={styles.firstInnerDiv}>
//                     <h1>Deposit</h1>
//                     <img src={img1} alt={""} className={styles.img1}/>
//                 </div>
//                 <img src={arrow} alt={""} className={styles.arrows}/>
//
//                 <div className={styles.secondInnerDiv}>
//                     <h1>Invest, Earn, <br/>Exchange </h1>
//                     <p>Purchase the crypto products <br/>that suit your portfolio, <br/>earn interest of up to 10%,
//                         paid <br/>daily and tracked to the <br/>second, or exchange and hold <br/>the coins of your
//                         choice.</p>
//                 </div>
//                 <img src={arrow} alt={""} className={styles.arrows}/>
//
//                 <div className={styles.thirdInnerDiv}>
//                     <h1>Withdraw </h1>
//                     <p>Withdraw with just 24 hours <br/>notice, no catches, no <br/>questions.<br/>Withdraw in real
//                         money or in <br/>crypto.</p>
//                     <img src={img2} alt={""} className={styles.img2}/>
//                 </div>
//
//             </div>
//
//         </div>
//     );
// }
// export default ThirdHero;
import styles from "./index.module.css";
import img1 from "./images/img.png";
import img2 from "./images/img_1.png";
import arrow from "./images/img_2.png";
import invest1 from "./images/img_4.png";
import invest2 from "./images/img_5.png"

const ThirdHero = () => {
    return (
        <div className={styles.mainContent}>
            <div className={styles.firstDiv}>
                <h1>How It Works</h1>
                <p>At Nextcent, we make it as simple as possible to deposit, earn, and withdraw. If you have <br/> any other questions, visit our FAQs or chat with our team.</p>
            </div>

            <div className={styles.secondDiv}>
                <div className={styles.firstInnerDiv}>
                    <h1>Deposit</h1>
                    <img src={img1} alt={""} className={styles.img1}/>
                </div>
                <img src={arrow} alt={""} className={styles.arrows}/>

                <div className={styles.secondInnerDiv}>
                    <h1>Invest, Earn,<br/>Exchange </h1>
                    <p>Purchase the crypto products <br/>that suit your portfolio, <br/>earn interest of up to 10%,
                        paid <br/>daily and tracked to the <br/>second, or exchange and hold <br/>the coins of your
                        choice.</p>
                    <div className={styles.images}>
                        <img src={invest1} alt={""} className={styles.invest1}/>
                        <img src={invest2} alt={""} className={styles.invest2}/>
                    </div>

                </div>
                <img src={arrow} alt={""} className={styles.arrows}/>

                <div className={styles.thirdInnerDiv}>
                    <h1>Withdraw </h1>
                    <p>Withdraw with just 24 hours <br/>notice, no catches, no <br/>questions.<br/>Withdraw in real
                        money or in <br/>crypto.</p>
                    <img src={img2} alt={""} className={styles.img2}/>
                </div>
            </div>
        </div>
    );
}
export default ThirdHero;
