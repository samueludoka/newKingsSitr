import styles from "./index.module.css";
import logo from "./Images/logo-no-background.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Navbar = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = toggle ? "hidden" : "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [toggle]);

    const handleGetStartedClick = () => {
        navigate("/sign-up");
        setToggle(false);
    };

    const handleNavClick = (path) => {
        navigate(path);
        setToggle(false);
    };

    return (
        <nav className={`${styles.mainCont} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.navWrapper}>
                {/* Logo */}
                <div className={styles.imageSect} onClick={() => handleNavClick("/")}>
                    <img src={logo} alt="logo" />
                </div>

                {/* Desktop Nav */}
                <div className={styles.linkCont}>
                    <a onClick={() => handleNavClick("/")} className={styles.navLink}>Home</a>
                    <a onClick={() => handleNavClick("/service")} className={styles.navLink}>Service</a>
                    <a onClick={() => (window.location.href = "https://www.coinbase.com")} className={styles.navLink}>Buy Crypto</a>
                    <a onClick={() => handleNavClick("/about")} className={styles.navLink}>About</a>
                    <a onClick={() => handleNavClick("/FAQss")} className={styles.navLink}>FAQ</a>
                </div>

                {/* Desktop Button */}
                <div className={styles.buttonSect}>
                    <button className={styles.mainButton} onClick={handleGetStartedClick}>
                        Get Started
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className={styles.menuToggle}>
                    <button className={styles.menuButton} onClick={() => setToggle(true)} aria-label="Open menu">
                        <IoMdMenu className={styles.menuIcon} />
                    </button>
                </div>
            </div>

            {/* Mobile Nav (only renders if toggle true) */}
            {toggle && (
                <>
                    <div className={styles.menuOverlay} onClick={() => setToggle(false)} />
                    <div className={styles.mobileMenu}>
                        <div className={styles.mobileMenuHeader}>
                            <div className={styles.mobileMenuLogo}>
                                <img src={logo} alt="logo" />
                            </div>
                            <button className={styles.closeButton} onClick={() => setToggle(false)} aria-label="Close menu">
                                <IoMdClose className={styles.closeIcon} />
                            </button>
                        </div>

                        <div className={styles.menuChange}>

                        {/* Mobile Nav Links */}
                        <div className={styles.mobileMenuLinks}>
                            <a onClick={() => handleNavClick("/")} className={styles.mobileNavLink}>Home</a>
                            <a onClick={() => handleNavClick("/service")} className={styles.mobileNavLink}>Service</a>
                            <a onClick={() => { window.location.href = "https://www.coinbase.com"; setToggle(false); }} className={styles.mobileNavLink}>Buy Crypto</a>
                            <a onClick={() => handleNavClick("/about")} className={styles.mobileNavLink}>About</a>
                            <a onClick={() => handleNavClick("/FAQss")} className={styles.mobileNavLink}>FAQ</a>
                        </div>

                        {/* Mobile Footer Button */}
                        <div className={styles.mobileMenuFooter}>
                            <button className={styles.mobileGetStarted} onClick={handleGetStartedClick}>
                                Get Started
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
