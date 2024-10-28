import React, {useEffect, useState} from 'react';
import styles from "./index.module.css"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
// import appLogo from './path-to-logo.png'; // Replace with the actual path to your logo image

const WithdrawPage = ({depositSuccessMessage = "Deposit successful",
                      investSuccessMessage = "Investment completed",
                      withdrawSuccessMessage = "Withdrawal processed",
                      investUrl = 'https://localhost:8086/api/v1/customer/invest',
                      withdrawUrl = 'https://localhost:8086/api/v1/customer/withdraw'}) => {
    const [currentSection, setCurrentSection] = useState('Deposit');
    const [coinType, setCoinType] = useState('Bitcoin');
    const [depositAmount, setDepositAmount] = useState('');
    const [paymentStatus,setPaymentStatus] = useState("nill")
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [investmentPlan, setInvestmentPlan] = useState('Basic');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawCoinType, setWithdrawCoinType] = useState('Bitcoin');
    const [customerWalletId, setCustomerWalletId] = useState('');
    const [balances, setBalance] = useState(10); // Initial balance
    const [status, setStatus] = useState("Nil"); // Initial status
    const [bonus, setBonus] = useState(10); // Default bonus
    const [transactionId, setTransactionId] = useState(null); // To store the transaction ID
    const [pendingDeposit, setPendingDeposit] = useState(null); // Track pending deposits
    const [id, setId] = useState(0)
    const [refresh, setRefreshWallet] = useState()

    const [customerAddress, setCustomerAddress] = useState('');



    const adminWalletId = 'binance_wallet_id';
    const navigate = useNavigate();
    const userId =sessionStorage.getItem("customerId")

    useEffect(() => {
    }, [userId]);

    const handleWithdraw = async () => {
        console.log('handleWithdraw triggered');

        // Retrieve the deposit transaction ID from session storage
        const transactionId = sessionStorage.getItem("amountToDeposit");

        if (!userId) {
            toast('No deposit found for withdrawal. Please make a deposit first.');
            return;
        }

        // Validate the customer wallet address length (must be between 23 and 46 characters)
        if (!customerAddress || customerAddress.length < 23 || customerAddress.length > 46) {
            toast('Invalid wallet address. It must be between 23 and 46 characters.');
            return;
        }

        try {
            const payload = {
                customerId: userId,
                coinType: coinType,
                amount: withdrawAmount, // This is the amount the user wants to withdraw
                customerWalletAddress: customerAddress
            };

            const response = await axios.post('http://localhost:8086/api/v1/customer/withdrawFunds', payload);
            console.log('withdrawal response', response);

            const { paymentStatus, balance, id } = response.data;

            const previousWithdrawTotal = parseFloat(sessionStorage.getItem("totalWithdrawnAmount")) || 0;
            const newWithdrawTotal = previousWithdrawTotal + parseFloat(withdrawAmount);

            sessionStorage.setItem("totalWithdrawnAmount", newWithdrawTotal.toString());

            setTransactionId(id); // Set the transaction ID
            setStatus(paymentStatus);
            toast(`Withdraw initiated. Withdraw ID: ${id}. Status: ${paymentStatus}`);

            if (paymentStatus === 'pending') {
                setPendingDeposit(id);
                toast('Payment is pending. Awaiting admin approval.');
            } else if (paymentStatus === 'approved') {
                toast('Payment approved. Balance updated!');
            }

        } catch (error) {
            console.error('Withdrawal failed:', error);
            const errorMessage = error.response?.data?.message || 'Failed to withdraw. Please try again later.';
            toast(`Error: ${errorMessage}`);
        }
    };


    const checkForApproval = async (id) => {
        if (!pendingDeposit) return;

        try {
            const response = await axios.get(`http://localhost:8086/api/v1/customer/checkDepositStatus/${pendingDeposit}`);
            const { paymentStatus, balance: updatedBalance } = response.data;

            if (paymentStatus === 'approved') {
                setBalance(updatedBalance); // Update the balance
                setPendingDeposit(null); // Clear pending deposit
                toast('Deposit approved by admin. Balance updated.');
                console.log(response)
            }
        } catch (error) {
            console.error('Failed to check approval status:', error);
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


    useEffect(() => {
        const interval = setInterval(() => {
            checkForApproval();
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [pendingDeposit]);

    return (
        <div className={styles.withdrawContainer}>
            {/* 1. Header Section with Logo and Writeup */}
            <div className={styles.header}>
                {/*<img src={appLogo} alt="App Logo" className={styles.logo} />*/}
                <h1 className={styles.title}>CRYPTOCURRENCY AUTOMATIC GATEWAY</h1>
                <p className={styles.subtitle}>FAST SECURE AND EASY PAYMENTS</p>
            </div>

            <div className={styles.balanceStatus}>
                <div className={styles.balance}>
                    <h2>Current Balance</h2>
                    <p>${refresh}</p>
                </div>
                <div className={styles.paymentStatus}>
                    <h2>Current Payment Status</h2>
                    <p>{status}</p>
                </div>
            </div>

            <div className={styles.paymentSteps}>
                <h2>Payment Steps</h2>
                <ol>
                    <li>>> Select the cryptocurrency gateway you want to use.</li>
                    <li>>> Paste your valid wallet address.</li>
                    <li>>> Fill the amount you want to withdraw.</li>
                    <li>>> Make sure the withdraw amount is less than the original balance by $100.</li>
                    <li>>> Click "Submit Payment" to continue.</li>
                    <li>>> Check your crypto wallet for funds.</li>
                </ol>
            </div>

            {/* 3. Bitcoin Address Input Field */}
            <div className={styles.inputGroup}>
                <label htmlFor="bitcoinAddress">Bitcoin Address:</label>
                <input
                    type="text"
                    id="bitcoinAddress"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Your Bitcoin address"
                    className={styles.inputField}/>
            </div>

            {/* 4. Payment Details */}
            <div className={styles.paymentDetails}>
                <label htmlFor="withdrawAmount">Enter Amount:</label>
                <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    id="withdrawAmount"
                    placeholder="Enter withdrawal amount"
                    className={styles.inputField}/>

                <label htmlFor="paymentGateway">Select Gateway:</label>
                <select id="paymentGateway" className={styles.inputField}>
                    <option value="Bitcoin">BITCOIN</option>
                    <option value="Ethereum">ETHEREUM</option>
                    <option value="Tether">TETHER(USDT Trc20)</option>
                    <option value="Litcoin">LITCOIN(LTC)</option>
                    <option value="Ripple">RIPPLE(XRP)</option>
                    <option value="Solana">SOLANA(SOL)</option>
                </select>
            </div>

            <div className={styles.btn}>
                <button
                    type="submit"
                    className={styles.submitButton}
                    onClick={handleWithdraw} // Link the function here
                >
                    Submit Payment
                </button>
                <p>When you click submit payment, check the payment status and confirm its pending and wait for Admin's approval.</p>
            </div>
        </div>
    );
};

export default WithdrawPage;
