
import styles from "./index.module.css";
import graph from "./Images/img-removebg-preview.png";
import award from "./Images/1018789-200-removebg-preview.png";
import happy from "./Images/image-removebg-preview.png";
import account from "./Images/img_2-removebg-preview.png";
import rate from "./Images/image-removebg-preview (2).png";
import Counter from "../../../component/Reuseables/Counter";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const FifthHero = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchOHLC = async () => {
            try {
                const response = await axios.get(
                    'https://min-api.cryptocompare.com/data/v2/histohour',
                    {
                        params: {
                            fsym: 'BTC',
                            tsym: 'USD',
                            limit: 24,
                            api_key: '691894f917baad35409bb00095f13eaa2faf1655f975694633f95dfb859c9a44'
                        }
                    }
                );

                const ohlc = response.data.Data.Data;

                // Prepare labels and data arrays
                const labels = ohlc.map((entry) => new Date(entry.time * 1000).toLocaleTimeString());
                const openPrices = ohlc.map((entry) => entry.open);
                const highPrices = ohlc.map((entry) => entry.high);
                const lowPrices = ohlc.map((entry) => entry.low);
                const closePrices = ohlc.map((entry) => entry.close);

                // Set the chart data
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Open',
                            data: openPrices,
                            borderColor: 'green',
                            fill: false,
                        },
                        {
                            label: 'High',
                            data: highPrices,
                            borderColor: 'blue',
                            fill: false,
                        },
                        {
                            label: 'Low',
                            data: lowPrices,
                            borderColor: 'red',
                            fill: false,
                        },
                        {
                            label: 'Close',
                            data: closePrices,
                            borderColor: 'orange',
                            fill: false,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching OHLC data:', error);
            }
        };

        fetchOHLC();
    }, []);

    return(
        <div className={styles.mainContent}>
            {/*<div className={styles.div1}>*/}
            {/*    <h1>Bitcoin Growth Schedule</h1>*/}
                <div className={styles.chartContainer}>
                    <h2>Bitcoin OHLC Chart (Last 24 Hours)</h2>
                    {chartData ? (
                        <Line data={chartData}/>
                    ) : (
                        <p>Loading OHLC data...</p>
                    )}
                {/*</div>*/}
            </div>

            <div className={styles.div2}>
                <div className={`${styles.row} ${styles.firstRow}`}>
                    <img src={award} alt={""} className={styles.award}/>
                    <h1>AWARDS <Counter start={0} end={75} duration={3000}/></h1>
                </div>

                <div className={`${styles.row} ${styles.secondRow}`}>
                    <img src={happy} alt={""} className={styles.happy}/>
                    <h1>HAPPY CLIENTS <Counter start={0} end={45612} duration={3000}/></h1>
                </div>

                <div className={`${styles.row} ${styles.thirdRow}`}>
                    <img src={account} alt={""} className={styles.account}/>
                    <h1>ACTIVE ACCOUNTS <Counter start={0} end={19367} duration={3000}/></h1>
                </div>

                <div className={`${styles.row} ${styles.fourthRow}`}>
                    <img src={rate} alt={""} className={styles.rate}/>
                    <h1>TOTAL RATE <br/><Counter start={0} end={16211} duration={3000}/></h1>
                </div>
            </div>

        </div>
    );
}
export default FifthHero;
