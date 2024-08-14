import styles from "./index.module.css";
import world from "./images/5Szl.gif";
import FilledButton from "../../../component/Reuseables/filledButton";
const PrefixHero = () =>{
    return(
        <div className={styles.mainContent}>
            <img src={world} alt={""} className={styles.world}/>
            <div className={styles.word}>
                <h1>Ready to be in the driver’s <br/>seat of next-gen diversification?</h1>
                <p>Contact us today from any part of the globe <br/>so that we can access your requirements in an initial meeting <br/>so
                    that nothing stands in the way of launching your crypto ETP! by clicking the button below.
                </p>
                <div style={{padding: "5px",marginLeft: "25rem"}}>
                    <FilledButton color={"#4CAF4F"} textColor={"#FFF"} text={"Explore More"} padding={"12px 30px"} border={"6px"}/>
                </div>
            </div>
        </div>
    );
}
export default PrefixHero;