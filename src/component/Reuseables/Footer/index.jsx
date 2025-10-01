import logo from "./images/logo-no-background.png";
import style from "./index.module.css";

const Footer = () => {
  const date = new Date().getFullYear();

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
            <li>Home</li>
            <li>Service</li>
            <li>Buy Crypto</li>
            <li>About</li>
            <li>Product</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Register Links */}
        <div className={style.column}>
          <h3>Register</h3>
          <ul>
            <li>Sign Up</li>
            <li>Login</li>
            <li>Account</li>
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
