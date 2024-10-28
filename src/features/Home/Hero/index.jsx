// import styles from "./index.module.css";
// import {useEffect, useState} from "react";
// // import background from "./Images/Bg.png"
// // import btc from "./Images/00-20-51-158_256.webp";
// import Slider from "react-slick"
// // import 'slick-carousel/slick/slick.css';
// // import 'slick-carousel/slick/slick-theme.css';
//
//
//
//
// const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR'];
//
// const Hero = () =>{
//     const fetchRates = async () => {
//         const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp,jpy,inr');
//         const data = await response.json();
//         return data.bitcoin;
//     };
//
//     const [rates, setRates] = useState({});
//     const [currentCurrency, setCurrentCurrency] = useState(0);
//
//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 10000,
//         slidesToShow: 8,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 0,
//         cssEase: "linear",
//         arrows: false
//     }
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const fetchedRates = await fetchRates();
//             setRates(fetchedRates);
//         };
//
//         fetchData();
//
//         const interval = setInterval(() => {
//             setCurrentCurrency((prevCurrency) => (prevCurrency + 1) % currencies.length);
//         }, 3000); // Change currency every 3 seconds
//
//         return () => clearInterval(interval);
//     }, []);
//
//     const currentRate = rates[currencies[currentCurrency].toLowerCase()];
//
//     const dataObject =  [
//         {"id": "bitcoin"},
//         {"symbol": "btc"},
//         {"name": "Bitcoin"},
//         {"image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"},
//         {"current_price": 70187},
//         {"market_cap": 1381651251183},
//         {"market_cap_rank": 1},
//         {"fully_diluted_valuation": 1474623675796},
//         {"total_volume": 20154184933},
//         {"high_24h": 70215},
//         {"low_24h": 68060},
//         {"price_change_24h": 2126.88},
//         {"price_change_percentage_24h": 3.12502},
//         {"market_cap_change_24h": 44287678051},
//         {"market_cap_change_percentage_24h": 3.31157},
//         {"circulating_supply": 19675987},
//         {"total_supply": 21000000},
//         {"max_supply": 21000000},
//         {"ath": 73738},
//         {"ath_change_percentage": -4.77063},
//         {"ath_date": "2024-03-14T07:10:36.635Z"},
//         {"atl": 67.81},
//         {"atl_change_percentage": 103455.83335},
//         // "atl_date": "2013-07-06T00:00:00.000Z",
//         // "roi": null,
//         // "last_updated": "2024-04-07T16:49:31.736Z"
//     ]
//
//
//     return(
//         <div className={styles.maincontent}>
//
//                         <div className={styles.slider}>
//                             <div className={styles.slider_track}>
//                                 <div className={styles.slide}>id: bitcoin</div>
//                                 <div className={styles.slide}>symbol: btc</div>
//                                 <div className={styles.slide}>name: Bitcoin</div>
//                                 <div className={styles.slide}><img width='40px' height='40px'
//                                                                    src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400'/>
//                                 </div>
//                                 <div className={styles.slide}>price: 70187</div>
//                                 <div className={styles.slide}>high_24h: 70215</div>
//                                 <div className={styles.slide}>low_24h: 68060</div>
//                                 <div className={styles.slide}>ath: 73738</div>
//                                 <div className={styles.slide}>total_supply: 21000000</div>
//                                 <div className={styles.slide}>ath: 73738</div>
//                                 <div className={styles.slide}>percentage_24h: 3.12502</div>
//                                 <div className={styles.slide}>id: bitcoin</div>
//                                 <div className={styles.slide}>symbol: btc</div>
//                                 <div className={styles.slide}>name: Bitcoin</div>
//                                 <div className={styles.slide}><img width='40px' height='40px'
//                                                                    src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400'/>
//                                 </div>
//                                 <div className={styles.slide}>price: 70187</div>
//                                 <div className={styles.slide}>high_24h: 70215</div>
//                                 <div className={styles.slide}>low_24h: 68060</div>
//                                 <div className={styles.slide}>ath: 73738</div>
//                                 <div className={styles.slide}>total_supply: 21000000</div>
//                                 <div className={styles.slide}>ath: 73738</div>
//                                 <div className={styles.slide}>percentage_24h: 3.12502</div>
//
//
//                             </div>
//                             {/*<Slider {...settings}>*/}
//
//                             {/*</Slider>*/}
//                         </div>
//
//
//
//             <div className={styles.innerContent}>
//                 {/*<img src={background} alt={" "} className={styles.backg}/>*/}
//                 <div className={styles.content}>
//                     <h1><span>Crypto ETPs, </span><br/>Your Gateway To The <br/>Digital <span
//                         className={styles.piantGold}>Investment </span>World.</h1>
//                     <h3>Investment Services Tailored <br/>To Meet Your Individual Need</h3>
//                 </div>
//                 {/*<img src={btc} className={styles.btc}/>*/}
//             </div>
//
//             <div className={styles.bitcoinConversion}>
//                 <div className={styles.rateDisplay}>
//                     1 BTC = {currentRate ? currentRate.toFixed(2) : '...'} {currencies[currentCurrency]}
//                 </div>
//             </div>
//             <div className={styles.authButton}>
//
//                 <button className={styles.signUp}>Sign Up</button>
//                 <button className={styles.login}>login</button>
//             </div>
//
//         </div>
//     );
// };
// export default Hero;