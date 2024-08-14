import styles from "./index.module.css";
import React, { useState, useEffect} from "react";
import axios from "axios";

const FourthHero = () =>{
    const [btcPrice, setBtcPrice] = useState(null);
    const [btcAmount, setBtcAmount] = useState('');
    const [usdValue, setUsdValue] = useState(null);

    // Fetch the current Bitcoin price in USD when the component mounts
    useEffect(() => {
        const fetchBtcPrice = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
                );
                setBtcPrice(response.data.bitcoin.usd);
            } catch (error) {
                console.error('Error fetching Bitcoin price:', error);
            }
        };

        fetchBtcPrice();
    }, []);

    // Handle Bitcoin amount input change
    const handleBtcAmountChange = (e) => {
        const value = e.target.value;
        setBtcAmount(value);

        if (btcPrice) {
            const usd = parseFloat(value) * btcPrice;
            setUsdValue(usd.toFixed(2)); // Set the USD value with two decimal places
        } else {
            setUsdValue(null);
        }
    };
    return(
      <div className={styles.mainContent}>
          <div className={styles.firstDiv}>
              <h1>Benefits of using <br/><span>Nextcent</span></h1>
              <h2>Nextcent offers a new level of trading and is able to offer market-leading pricing and trading conditions <br/>through the MT4 platform by providing clients with true ECN connectivity.</h2>
                  <div className={styles.linedWords}>
                  <p>1. <span>Fast Transactions: </span>Withdrawal takes less than 2 minutes.<br/>
                      2. <span>Processing Fees: </span>You get everything for one low, transparent fee of 0.25% . <br/>
                      3. <span>No Boundaries: </span>Xpertrades accept users from all over the world, no country restricted. <br/>
                      4. <span>Customer Privacy: </span>There is no need to collect private information from our customers to accept payment if using bitcoin.
                  </p>
              </div>
          </div>

          <div className={styles.calculator}>
              <h1 className={styles.div1}>Bitcoin to USD Converter</h1>
              <p className={styles.secDiv}>Current Bitcoin Price: ${btcPrice ? btcPrice.toLocaleString() : 'Loading...'}</p>

              <input
                  type="number"
                  value={btcAmount}
                  onChange={handleBtcAmountChange}
                  placeholder="Enter amount in BTC"
              />
              <p className={styles.thirdDiv}>USD Value: {usdValue !== null ? `$${usdValue}` : 'Enter BTC amount'}</p>
              <p className={styles.Div2}>Use the Bitcoin calculator to find out <br/>exactly how much your Bitcoin is worth in <br/>USD,by using accurate, up-to-date exchange rates.

              </p>
          </div>
          );
      </div>
    );
}
export default FourthHero;