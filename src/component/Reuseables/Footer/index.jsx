import logo from "../../../assets/header/Icon.png"
import style from "./index.module.css"
import instagram from "../../../assets/footer/instagram.png"
import tire from "../../../assets/footer/tire.png"
import twitter from "../../../assets/footer/twitter.png"
import youtube from "../../../assets/footer/youtube.png"
import send from "../../../assets/footer/send.png";
import message from "./images/img.png"
const Footer = ()=>{
    const date = new Date().getFullYear()

    return(
        <div className={style.mainCont}>

            <div className={style.mainDiv}>
                <div className={style.firstDiv}>
                    <img src={logo} alt={""}/>
                    <h1>Nexcent</h1>
                </div>
                <p>Copyright © {date} Nexcent ltd.</p>
                <p>All rights reserved</p>

                <div className={style.socialIcon}>
                    <img src={instagram} alt={"instagram logo"}/>
                    <img src={tire} alt={""} className={style.tire}/>
                    <img src={twitter} alt={""}/>
                    <img src={youtube} alt={""} className={style.youtube}/>
                </div>
            </div>


            <div className={style.company}>
                <h3>Company</h3>
                <div className={style.companyPara}>
                    <p>About us</p>
                    <p>Blog</p>
                    <p>Contact us</p>
                    <p>Pricing</p>
                    <p>Testimonials</p>
                </div>
            </div>

            <div className={style.company}>
                <h3>Support</h3>
                <div className={style.companyPara}>
                    <p>Help center</p>
                    <p>Terms of service</p>
                    <p>Legal</p>
                    <p>Privacy policy</p>
                    <p>Status</p>
                </div>
            </div>

            <div className={style.company}>
                <h3>Stay up to date</h3>
                <input type={"text"} placeholder={"Your email address..."}/>
                <img src={send} alt={""} className={style.send}/>
            </div>


        </div>
    )
}

export default Footer;