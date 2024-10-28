import styles from "./index.module.css";
import logo from "./Images/logo-no-background.png"
import OutlinedButton from "../filledButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);

    // const handleNavigation = (value) => {
    //     navigate(value);
    // };
    const handleGetStartedClick = () => {
        console.log("Navigating to /customerDashboard2");
        navigate('/customerDashboard2');
    };

    return (
        <div className={styles.mainCont}>
            <div className={styles.imageSect}>
                <img src={logo} alt="logo"/>
            </div>

            {/* Full navigation links - shown on desktop */}
            <div className={styles.linkCont}>
                <p onClick={() => navigate("/")}>Home</p>
                <p onClick={() => navigate("/service")}>Service</p>
                <p onClick={() => window.location.href = "https://www.coinbase.com"}>Buy Crypto</p>
                <p onClick={() => navigate("/about")}>About</p>
                {/*<p onClick={() => navigate("/")}>Product</p>*/}
                <p onClick={() => navigate("/FAQss")}>FAQ</p>
            </div>

            {/* Signup button */}
            <div className={styles.buttonSect}>
                <button className={styles.mainButton} onClick={handleGetStartedClick}>
                    Get Started
                </button>

            </div>

            {/* Mobile menu icon */}
            <div className={styles.menu}>
                <IoMdMenu onClick={() => setToggle(true)} className={styles.menuIcon} style={{color: "#fff"}}/>
                {toggle && (
                    <div className={styles.insideMenu}>
                        <IoMdClose onClick={() => setToggle(false)}/>
                        <p onClick={() => navigate("/")}>Home</p>
                        <p onClick={() => navigate("/service")}>Service</p>
                        <p onClick={() => navigate("/about")}>About</p>
                        <p onClick={() => navigate("/")}>Product</p>
                        <p onClick={() => navigate("/FAQss")}>FAQ</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Navbar;
