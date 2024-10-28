import React, {useEffect, useState} from 'react';
import axios from 'axios';
import logo from "./images/logo-no-background.png"

const InvestComponent = () => {
    const [coinType, setCoinType] = useState('');
    const [planType, setPlanType] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState({ loading: false, error: '', success: '' });
    const [refresh, setRefreshWallet] = useState();
    const [id, setId] = useState(0)


    const coinOptions = [
        'Bitcoin', 'Ethereum', 'Tether', 'Litcoin', 'Ripple', 'Solana'
    ];

    const planOptions = [
        {
            label: 'BASIC (1.09), Min: $200, Max: $5000, Duration: 5 days',
            value: 'BASIC',
            minAmount: 200,
            maxAmount: 5000,
            duration: '5 days'
        },
        {
            label: 'SILVER (1.14), Min: $5000, Max: $7000, Duration: 7 days',
            value: 'SILVER',
            minAmount: 5000,
            maxAmount: 7000,
            duration: '7 days'
        },
        {
            label: 'PLATINUM (1.18), Min: $11,000, Max: $21,000, Duration: 14 days',
            value: 'PLATINUM',
            minAmount: 11000,
            maxAmount: 21000,
            duration: '14 days'
        },
        {
            label: 'MASTER (1.23), Min: $21,000, Max: $35,000, Duration: 21 days',
            value: 'MASTER',
            minAmount: 21000,
            maxAmount: 35000,
            duration: '21 days'
        },
        {
            label: 'EXECUTIVE (1.27), Min: $35,000, Max: $50,000, Duration: 27 days',
            value: 'EXECUTIVE',
            minAmount: 35000,
            maxAmount: 50000,
            duration: '27 days'
        },
        {
            label: 'PREMIUM (1.30), Min: $50,000, Max: $75,000, Duration: 30 days',
            value: 'PREMIUM',
            minAmount: 50000,
            maxAmount: 75000,
            duration: '30 days'
        },
        {
            label: 'GOLD (1.35), Min: $75,000, Max: $100,000, Duration: 35 days',
            value: 'GOLD',
            minAmount: 75000,
            maxAmount: 100000,
            duration: '35 days'
        }
    ];

    const handleInvest = async () => {
        setStatus({ loading: true, error: '', success: '' });

        const customerId = sessionStorage.getItem("customerId");

        if (!customerId) {
            setStatus({ loading: false, error: 'Customer ID not found. Please log in again.', success: '' });
            return;
        }

        try {
            const payload = {
                customerId,
                coinType,
                planType,
                amount,
            };

            const response = await axios.post('http://localhost:8086/api/v1/customer/initiateTrade', payload);

            const { walletId, tradeStatus, updatedAmount } = response.data;

            // Store updatedAmount in sessionStorage
            sessionStorage.setItem("investmentAmount", updatedAmount);

            setId(walletId);

            if (tradeStatus) {
                setStatus({ loading: false, success: 'Investment successful!', error: '' });
            } else {
                throw new Error('Investment failed. Try again.');
            }
        } catch (error) {
            setStatus({ loading: false, success: '', error: error.message || 'Investment failed. Try again.' });
        }
    };


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




    return (
        <div className="invest-container" style={styles.container}>
            <img src={logo}  style={styles.logo}/>
            <h1 style={styles.header}>CRYPTOCURRENCY GATEWAY</h1>
            {/*<h2 style={styles.subHeader}>FAST, SECURE, AND EASY PAYMENTS</h2>*/}

            <div style={styles.balanceBox}>
                <h3 style={styles.balanceText}>Current Balance: ${refresh}</h3>
            </div>

            <div style={styles.paymentSteps}>
                <h3 style={styles.step}>1. Select the cryptocurrency gateway you want to use:</h3>
                <select
                    value={coinType}
                    onChange={(e) => setCoinType(e.target.value)}
                    style={styles.input}
                >
                    <option value="" disabled>Select Coin Type</option>
                    {coinOptions.map((coin, index) => (
                        <option key={index} value={coin}>{coin}</option>
                    ))}
                </select>

                <h3 style={styles.step}>2. Select the plan type you want to use:</h3>
                <select
                    value={planType}
                    onChange={(e) => setPlanType(e.target.value)}
                    style={styles.input}
                >
                    <option value="" disabled>Select Plan Type</option>
                    {planOptions.map((plan, index) => (
                        <option key={index} value={plan.value}>{plan.label}</option>
                    ))}
                </select>

                <h3 style={styles.step}>3. Enter the amount you wish to invest:</h3>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={styles.input}
                    placeholder="Enter Amount"
                />

                <h3 style={styles.step}>4. Press the Invest Now button to continue...</h3>
                <button onClick={handleInvest} style={styles.button} disabled={status.loading}>
                    {status.loading ? 'Processing...' : 'Invest Now'}
                </button>

                {status.error && <p style={styles.error}>{status.error}</p>}
                {status.success && <p style={styles.success}>{status.success}</p>}
            </div>

            <p style={styles.waitNote}>5. Wait for the period of time associated with your selected investment plan.</p>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#001f3f',
        color: '#FFD700',
        padding: '20px',
        borderRadius: '10px',
        position: 'fixed', // Change to fixed or absolute
        top: 0, // Aligns to the top
        left: 0, // Aligns to the left
        height: '100vh', // Full height of the viewport
        width: '100vw', // Full width of the viewport
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center contents vertically
        alignItems: 'center', // Center contents horizontally
    },
    logo: {
        width: '150px', // Set width as needed
        height: '30px', // Change 'length' to 'height'
    },

    header: {
        fontSize: '28px',
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: '18px',
        marginBottom: '20px',
    },
    balanceBox: {
        border: '2px solid #FFD700',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    balanceText: {
        margin: 0,
    },
    paymentSteps: {
        marginBottom: '20px',
        display: 'flex',               // Enable flexbox
        flexDirection: 'column',       // Stack children vertically
        alignItems: 'center',          // Center items horizontally
    },
    step: {
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '2px solid #FFD700',
        borderRadius: '5px',
        backgroundColor: '#001f3f',
        color: '#FFD700',
    },
    button: {
        backgroundColor: '#FFD700',
        color: '#001f3f',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    success: {
        color: 'green',
        marginTop: '10px',
    },
    waitNote: {
        fontSize: '14px',
        marginTop: '20px',
    },
};

export default InvestComponent;
