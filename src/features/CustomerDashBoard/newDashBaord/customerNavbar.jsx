import styles from "../newDashBaord/customerNavbar.module.css";
import logo from "../newDashBaord/images/logo-no-background.png"
import contact from "../newDashBaord/images/img.png";
import deposit from "../newDashBaord/images/img_1.png"
import withdraw from "../newDashBaord/images/img_2.png"
import invest from "../newDashBaord/images/img_3.png"
import log from "../newDashBaord/images/img_4.png"
import signal from "../newDashBaord/images/img_5.png"
import upgradeAccount from "../newDashBaord/images/img_6.png"
import plan from "../newDashBaord/images/img_7.png"
import accountVerified from "../newDashBaord/images/img_8.png"
import home from "../newDashBaord/images/img_9.png"
import logout from "../newDashBaord/images/img_10.png"
import backg from "../newDashBaord/images/img_11.png"

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
// import { Link } from 'react-router-dom';


// Register the necessary components
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);




const CustomerNavbar = () => {
    const [chartData, setChartData] = useState(null);
    const [copySuccess, setCopySuccess] = useState('');
    const navigate = useNavigate();
    const navigate1 = useNavigate();
    const navigate2 = useNavigate()
    const [depositAmount] = useState('');
    const [refresh, setRefreshWallet] = useState()
    const [id, setId] = useState(0)
    const [customerWalletId, setCustomerWalletId] = useState('');
    const investmentAmount = sessionStorage.getItem("investmentAmount") || '0'; // Fallback to '0' if no amount is stored
    const totalWithdrawnAmount = sessionStorage.getItem("totalWithdrawnAmount") || '0'; // Default to '0' if not set





    const handleNavigate = () => {
        navigate("/deposit");
    };
    const handleNavigate1 = () => {
        navigate1('/withdraw');
    };
    const handleNavigate2 = () => {
        navigate2('/invest')
    }

    const refreshWallet = async (walletId) => {
        fetch(`http://localhost:8086/api/v1/customer/viewCustomerWallet/${walletId}`, {
            method: "GET"
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Failed to refresh dash board');
                }
                console.log("The response: ", response)
                const deResponse = await response.json()
                setRefreshWallet(deResponse?.balance)
                return response.json();
            })
            .catch(error => {
                // setError(error.message);
            });
    };
    const walletId = sessionStorage.getItem('walletId')


    useEffect(() => {
        if( walletId){
            refreshWallet(walletId).then(r =>  {
                console.log("r:", r)
            }).catch(error => {
                console.error('Error checking for approval:', error);
            })
        }
    },[id])




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

    const referralLink = "https://yourwebsite.com/referral?code=123456"; // Replace with the dynamic referral link

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
        }).catch(err => {
            setCopySuccess('Failed to copy');
        });
    };

    return (
        <div className={styles.CUSTOMER} style={{position: "fixed"}}>
            <div className={styles.navbar}>
                <img src={logo} alt={" "} className={styles.logo}/>
            </div>

            <div className={styles.sidebar}>
                <h2>Dashboard</h2>
                <ul className={styles.sidebarlist}>
                    <li className={styles.sidebaritem}>
                        <h3>Funds</h3>
                        <ul className={styles.sublist}>
                            <li onClick={handleNavigate} className={styles.navItem}><a href="#">
                                <img src={deposit} alt="Deposit Funds" className={styles.fasfamoneybill}/>
                                <span className={styles.depositText}> Deposit Funds</span>
                            </a></li>

                            <li onClick={handleNavigate1} className={styles.navItem}><a href="#">
                                <img src={withdraw} alt="Withdraw Funds" className={styles.fasfacreditcard}/>
                                <span className={styles.withdrawText}> Withdraw Funds</span>
                            </a></li>

                            <li onClick={handleNavigate2} className={styles.navItem}><a href="#">
                                <img src={invest} alt="Withdraw Funds" className={styles.fasfachartline}/>
                                <span className={styles.investText}> Invest Funds </span>
                            </a></li>

                            <h3>Others</h3>
                            <li><a href="#">
                                <img src={signal} alt="Withdraw Funds" className={styles.fasfasignal}/>
                                <span className={styles.purchaseText}> Purchase Signals</span>
                            </a></li>

                            <li><a href="#">
                                <img src={upgradeAccount} alt="Withdraw Funds" className={styles.fasfausershield}/>
                                <span className={styles.upgradeText}>Upgrade Account</span>
                            </a></li>

                            <li><a href="#">
                                <img src={plan} alt="Withdraw Funds" className={styles.fasfaclipboardlist}/>
                                <span className={styles.planText}> My Plans</span>
                            </a></li>

                            <li><a href="#">
                                <img src={accountVerified} alt="Withdraw Funds"
                                     className={styles.fasfacheckcircle}/>
                                <span className={styles.verifyText}> Verify Account</span></a></li>

                            <li><a href="#">
                                <img src={home} alt="Withdraw Funds" className={styles.fasfahome}/>
                                <span className={styles.HomeText}>Home</span>
                            </a></li>

                            <li><a href="#">
                                <img src={logout} alt={""} className={styles.fasfasignoutalt}/>
                                <span className={styles.logText}> Logout</span>
                            </a></li>


                        </ul>
                    </li>
                </ul>
            </div>


            <div className={styles.maincontent}>
                <img src={backg} alt={""} className={styles.background}/>

                <div className={styles.AccountBalance}>

                    <div className={styles.depositBalance}>
                        <p>{`${depositAmount}`}</p>
                        <p>Deposits</p>
                        <div>
                            <p className="text-white"> <span
                                className="font-bold text-yellow-400">${refresh}</span></p>
                        </div>
                    </div>

                    <div className={styles.profits}>
                        <p>Invests</p>
                        <p>{`Amount Invested: $${investmentAmount}`}</p>
                    </div>


                    <div className={styles.withdraw}>
                        <p>Total Withdraw</p>
                        <p>{`Total Withdrawn Amount: $${totalWithdrawnAmount}`}</p>
                    </div>

                </div>
                <h1>Bitcoin Growth Schedule</h1>
                <div className={styles.flexContainer}> {/* Add a new wrapper */}
                    <div className={styles.chartContainer} style={{zIndex: 100}}>
                        <h2>Bitcoin OHLC Chart (Last 24 Hours)</h2>
                        {chartData ? (
                            <Line data={chartData}/>
                        ) : (
                            <p>Loading OHLC data...</p>
                        )}
                    </div>

                    <div className={styles.container}>
                        <h1>Personal Referral Link</h1>
                        <div className={styles.linkContainer}>
                            <span className={styles.referralLink}>{referralLink}</span>
                            <button onClick={copyToClipboard} className={styles.copyButton}>
                                Copy
                            </button>
                        </div>
                        {copySuccess && <p className={styles.copyMessage}>{copySuccess}</p>}
                        <div className={styles.referralEx}>
                            <h1>Rerrals</h1>
                            <p>Present our project to your friends, family,
                                <br/>or any other community and enjoy
                                <br/>the financial benefits. You don't even
                                <br/>need an active deposit to receive affiliate
                                <br/>commission.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    );
}
export default CustomerNavbar;