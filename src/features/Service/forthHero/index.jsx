import styles from "./index.module.css";
import React, { useState, useEffect} from "react";
import axios from "axios";

const FourthHero = () =>{
    return(
        <div className={styles.mainContent}>
            <div className={styles.firstDiv}>
                <h1>Benefits of using <span>Nextcent</span></h1>
                <h3>Nextcent offers a new level of trading and is able to offer market-leading pricing and trading
                    conditions <br/>through the MT4 platform by providing clients with true ECN connectivity.</h3>
                <div className={styles.linedWords}>
                    <p>1. <span>Fast Transactions: </span>Withdrawal takes less than 2 minutes.<br/>
                        2. <span>Processing Fees: </span>You get everything for one low, transparent fee of 0.25%
                        . <br/>
                        3. <span>No Boundaries: </span>Nextcents accept users from all over the world, no country
                        restricted. <br/>
                        4. <span>Customer Privacy: </span>There is no need to collect private information from our
                        customers to accept payment if using bitcoin.
                    </p>
                </div>
            </div>


            <div className={styles.videoCointainermMain}>
                <iframe src="https://www.youtube.com/embed/x7msE3tx8QI?si=s7r2wO25RpKaVQdL"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen className={styles.videoCointainer}></iframe>
            </div>
            );
        </div>
    );
}
export default FourthHero;