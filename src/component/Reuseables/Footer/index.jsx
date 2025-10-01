import logo from "./images/logo-no-background.png";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const date = new Date().getFullYear();
  const navigate = useNavigate();

  const handleClick = (page) => {
    navigate(page);
    
};


  return (
    <footer className={style.footer}>
      <div className={style.container}>
        
        {/* Brand / About */}
        <div className={style.brand}>
          <div className={style.logoRow}>
            <img src={logo} alt="Nexcent Logo" className={style.logo} />
            <h1 className={style.brandName}>Nexcent</h1>
          </div>
          <p className={style.copy}>
            Copyright © {date} Nexcent Ltd. <br /> All rights reserved.
          </p>
          <p className={style.motto}>
            Sound Management Practices; Competent & Credible Traders; <br />
            User Friendly Policies, Procedures and Systems; <br />
            Proactive Service Philosophy and Strategy; <br />
            Multiple Support Channels.
          </p>
        </div>

        {/* Company Links */}
        <div className={style.column}>
          <h3>Company</h3>
          <ul>
            <li onClick={()=>handleClick("/home")}>Home</li>
            <li onClick={()=>handleClick("/service")}>Service</li>
            <li onClick={()=>handleClick("/home")} >Buy Crypto</li>
            <li onClick={()=>handleClick("/about")}>About</li>
            <li>Product</li>
            <li onClick={()=>handleClick("/FAQss")}>FAQ</li>
          </ul>
        </div>

        {/* Register Links */}
        <div className={style.column}>
          <h3>Register</h3>
          <ul>
            <li onClick={()=>handleClick("/sign-up")}>Sign Up</li>
            <li onClick={()=>handleClick("/login")}>Login</li>
            <li onClick={()=>handleClick("/customerDashboard2")}>Account</li>
          </ul>
        </div>

        {/* Contact */}
        <div className={style.column}>
          <h3>Contact</h3>
          <p className={style.contact}>support@nextcents.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
