import styles from "./index.module.css";
import {useEffect, useState} from "react";

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR'];

const Hero = () =>{
    const fetchRates = async () => {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp,jpy,inr');
        const data = await response.json();
        return data.bitcoin;
    };

    const [rates, setRates] = useState({});
    const [currentCurrency, setCurrentCurrency] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedRates = await fetchRates();
            setRates(fetchedRates);
        };

        fetchData();

        const interval = setInterval(() => {
            setCurrentCurrency((prevCurrency) => (prevCurrency + 1) % currencies.length);
        }, 3000); // Change currency every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const currentRate = rates[currencies[currentCurrency].toLowerCase()];


    return(
        <div className={styles.maincontent}>
            <div className={styles.content}>
                <h1><span>Crypto ETPs, </span><br/>your gateway to the digital <span
                    className={styles.piantGold}>investment </span>world.</h1>
                <h3>As a pioneer in the launch of active crypto Exchange Traded Products (ETP),<br/> Bitcoin Capital is
                    ready to become your first point of contact for <br/>launching your own innovative crypto ETP. Take
                    advantage of an emerging market and contact us today.</h3>
            </div>

            <div className={styles.bitcoinConversion}>
                <div className={styles.rateDisplay}>
                    1 BTC = {currentRate ? currentRate.toFixed(2) : '...'} {currencies[currentCurrency]}
                </div>
            </div>

        </div>
    );
};
export default Hero;