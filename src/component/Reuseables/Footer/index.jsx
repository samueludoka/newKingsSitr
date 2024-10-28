import logo from "./images/logo-no-background.png"
import style from "./index.module.css"

const Footer = ()=>{
    const date = new Date().getFullYear()

    return(
        <div className={style.mainCont}>

            <div className={style.mainDiv}>
                <div className={style.firstDiv}>
                    {/*<img src={logo} alt={""} className={style.logo}/>*/}
                    <h1>Nexcents</h1>
                </div>
                <p>Copyright © {date} Nexcent ltd.</p>
                <p>All rights reserved</p>

                <div className={style.socialIcon}>
                    <p>Sound Management Practices; Competent &
                        <br/>Credible Traders; User Friendly Policies,
                        <br/>Procedures and Systems;Proactive Service <br/>
                        Philosophy and Strategy; Multiple Support Channels;</p>
                </div>
            </div>


            <div className={style.company}>
                <h3>Company</h3>
                <div className={style.companyPara}>
                    <p> >> Home</p>
                    <p> >> Service</p>
                    <p> >> Buy Crypto</p>
                    <p> >> About</p>
                    <p> >> Product</p>
                    <p> >> FAQ</p>
                </div>
            </div>

            <div className={style.company}>
                <h3>Register</h3>
                <div className={style.companyPara}>
                    <p> >> sign up</p>
                    <p> >> login</p>
                    <p> >> account</p>
                </div>
            </div>

            <div className={style.company}>
                <h3>Contact</h3>
                <p>support@nextcents.com</p>
            </div>


        </div>
    )
}

export default Footer;