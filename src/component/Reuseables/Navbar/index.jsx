import styles from "./index.module.css";
import logo from "../../../assets/header/Icon.png"
import OutlinedButton from "../filledButton";
import FilledButton from "../filledButton"
const Navbar = () =>{
    return (
        <div className={styles.mainCont}>

            <div className={styles.imageSect}>
                <img src={logo} alt={""}/>
                <h1>Nexcent</h1>
            </div>

            <div className={styles.linkCont}>
                <p>Home</p>
                <p>Service</p>
                <p>Feature</p>
                <p>Product</p>
                <p>Testimonial</p>
                <p>FAQ</p>
            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "20px", padding: "15px"}}>
                <OutlinedButton borderColor={"#FFF"} textColor={"#4CAF4F"} padding={"12px 17px 10px"} text={"Login"}/>
                <FilledButton color={"#4CAF4F"} textColor={"#FFF"} text={"Sign up"} padding={"12px 30px"}
                              border={"6px"}/>
            </div>

        </div>
    );
}
export default Navbar;