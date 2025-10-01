import styles from "./index.module.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR'];

const Hero = () =>{
    const fetchRates = async () => {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp,jpy,inr');
        const data = await response.json();
        return data.bitcoin;
    };

    const [rates, setRates] = useState({});
    const [currentCurrency, setCurrentCurrency] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(true);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/customerDashboard2');
    };

    const handlePrevious = () => {
        setCurrentIndex(prev => !prev);
    };

    const handleNext = () => {
        setCurrentIndex(prev => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            const fetchedRates = await fetchRates();
            setRates(fetchedRates);
        };

        fetchData();

        const interval = setInterval(() => {
            setCurrentCurrency((prevCurrency) => (prevCurrency + 1) % currencies.length);
            setCurrentIndex((prevIndex) => !prevIndex );
        }, 10000);

        return () => clearInterval(interval);
    }, []);
    
    const currentRate = rates[currencies[currentCurrency].toLowerCase()];

    const dataSlides = [
        { label: "id", value: "bitcoin" },
        { label: "symbol", value: "btc" },
        { label: "name", value: "Bitcoin" },
        { type: "image", src: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" },
        { label: "price", value: "70187" },
        { label: "high_24h", value: "70215" },
        { label: "low_24h", value: "68060" },
        { label: "ath", value: "73738" },
        { label: "total_supply", value: "21000000" },
        { label: "percentage_24h", value: "3.12502" }
    ];

    return(
        <div className={styles.maincontain}>
            <div className={styles.slider}>
                <div className={styles.slider_track}>
                    {[...dataSlides, ...dataSlides, ...dataSlides].map((item, index) => (
                        <div key={index} className={styles.slide}>
                            {item.type === "image" ? (
                                <img width='40px' height='40px' src={item.src} alt="Bitcoin"/>
                            ) : (
                                `${item.label}: ${item.value}`
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.major}>
                {/* Navigation Arrows */}
                <button 
                    className={`${styles.navArrow} ${styles.navArrowLeft}`}
                    onClick={handlePrevious}
                    aria-label="Previous slide"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>

                <button 
                    className={`${styles.navArrow} ${styles.navArrowRight}`}
                    onClick={handleNext}
                    aria-label="Next slide"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>

                {/* Slide Indicators */}
                <div className={styles.slideIndicators}>
                    <span 
                        className={`${styles.indicator} ${currentIndex ? styles.indicatorActive : ''}`}
                        onClick={() => setCurrentIndex(true)}
                    />
                    <span 
                        className={`${styles.indicator} ${!currentIndex ? styles.indicatorActive : ''}`}
                        onClick={() => setCurrentIndex(false)}
                    />
                </div>

                {currentIndex && (
                    <div className={styles.innerContents}>
                        <div className={styles.content}>
                            <div className={styles.badge}>Welcome to the Future</div>
                            <h1>
                                <span className={styles.highlight}>Crypto ETPs, </span>
                                <br/>Your Gateway To The <br/>Digital <span className={styles.piantGold}>Investment </span>World.
                            </h1>
                            <h3>Investment Services Tailored <br/>To Meet Your Individual Need</h3>
                        </div>

                        <div className={styles.authButton}>
                            <button className={styles.signUp} onClick={() => navigate('/sign-up')}>
                                Sign Up
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                            <button className={styles.login} onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </div>
                    </div>
                )}

                {!currentIndex && (
                    <div className={styles.content2}>
                    <div className={styles.cont}>
                      <div className={styles.badge}>Investment Consulting</div>
                      <h1>Manage And Grow <br/>Your Investments</h1>
                      <p className={styles.subtitle}>Professional guidance for your crypto journey</p>
                  
                      <div className={styles.actionsRow}>
                        <div className={styles.bitcoinConversion}>
                          <div className={styles.rateDisplay}>
                            <span className={styles.btcLabel}>1 BTC</span>
                            <span className={styles.equals}>=</span>
                            <span className={styles.rateValue}>
                              {currentRate ? currentRate.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '...'}
                            </span>
                            <span className={styles.currency}>{currencies[currentCurrency]}</span>
                          </div>
                        </div>
                  
                        <button className={styles.mainButton} onClick={handleClick}>
                          Go to Account
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                )}
            </div>
        </div>
    );
}

export default Hero;