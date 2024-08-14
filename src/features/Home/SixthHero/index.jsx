import styles from "./index.module.css";
import FilledButton from "../../../component/Reuseables/filledButton";
const SixthHero = () =>{
    return (
        <div className={styles.mainContent}>
            <h1>Contact us today so that we can assess your requirements in an initial meeting so that nothing stands in the way of launching your crypto ETP!</h1>
            <div className={styles.inputs}>
                <p>Leave a message</p>
                <div  className={styles.input1}>
                    <input type={"text"} placeholder={"Your email address..."}/>
                    <input className={styles.message} type={"text"} placeholder={"Message..."} />
                    <FilledButton color={"#4CAF4F"} textColor={"#FFF"} text={"sendMessage"} padding={"12px 30px"} border={"6px"}/>
                </div>
            </div>
        </div>
    );
}
export default SixthHero;