import React, {useEffect, useState} from 'react';
import styles from "./index.module.css";
import logo from "./images/logo-no-background.png"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

const DepositPage = (  {depositSuccessMessage = "Deposit successful",
                       investSuccessMessage = "Investment completed",
                       withdrawSuccessMessage = "Withdrawal processed",
                       investUrl = 'https://localhost:8086/api/v1/customer/invest',
                       withdrawUrl = 'https://localhost:8086/api/v1/customer/withdraw'}) => {

    const [currentSection, setCurrentSection] = useState('Deposit');
    const [coinType, setCoinType] = useState('Bitcoin');
    const [depositAmount, setDepositAmount] = useState('');
    const [paymentStatus,setPaymentStatus] = useState("nill")
    const [balances, setBalance] = useState(10); // Initial balance
    const [status, setStatus] = useState("Nil"); // Initial status
    const [bonus, setBonus] = useState(10); // Default bonus
    const [transactionId, setTransactionId] = useState(null); // To store the transaction ID
    const [pendingDeposit, setPendingDeposit] = useState(null); // Track pending deposits
    const [id, setId] = useState(0)
    const [refresh, setRefreshWallet] = useState()

    const [amount, setAmount] = useState('');
    const [gateway, setGateway] = useState('Bitcoin');
    const [message, setMessage] = useState('');
    const [isClicked, setIsClicked] = useState(false);



    const adminWalletId = 'binance_wallet_id';
    const navigate = useNavigate();
    const userId =sessionStorage.getItem("customerId")





    const handleSubmit = async (e) => {
        setIsClicked(true);
        e.preventDefault();
        console.log('handleDeposit triggered');

        // Retrieve userId from session storage
        console.log(userId)

        if (!userId) {
            toast('User is not logged in or session expired.');
            return;
        }

        console.log(userId, "from d payload");

        try {
            const payload = {
                customerId: userId,
                coinType: coinType,
                amount: amount,
            };

            // Make the POST request to initiate the deposit
            const response = await axios.post('http://localhost:8086/api/v1/customer/addFunds', payload);
            console.log(response,'the response');

            const { id, paymentStatus,  walletId } = response.data;
            console.log(walletId,'the id')
            sessionStorage.setItem("amountToDeposit", id);
            sessionStorage.setItem("status",paymentStatus);
            setPaymentStatus(paymentStatus)
            console.log("The payment status: ",paymentStatus)
            setId(walletId)

            setTransactionId(id); // Set the transaction ID
            setStatus(paymentStatus);
            toast(`Payment initiated. Payment ID: ${id}. Status: ${paymentStatus}`);

            if (paymentStatus === 'pending') {
                setPendingDeposit(id);
                toast('Payment is pending. Awaiting admin approval.');
            } else if (paymentStatus === 'approved') {
                // If the payment is approved immediately, update balance
                // setBalance(newBalance);
                toast('Payment approved. Balance updated!');
            }

        } catch (error) {
            console.error('Deposit failed:', error);
            const errorMessage = error.response?.data?.message || 'Failed to deposit. Please try again later.';
            toast(`Error: ${errorMessage}`);
        }
        setMessage(`Deposit of $${amount} using ${gateway} has been initiated.`);
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

    useEffect(() => {
        const interval = setInterval(() => {
            checkForApproval();
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [pendingDeposit]);

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



    const handleCopyAddress = (address) => {
        navigator.clipboard.writeText(address);
        alert('Address copied to clipboard');
    };
    // navigate('/customerDashboard2');

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <h1 className={styles.title}>CRYPTOCURRENCY GATEWAY</h1>
                <p className={styles.subTitle}>FAST SECURE AND EASY PAYMENTS.</p>
            </div>

            <div className={styles.balanceStatus}>
                <div className={styles.balance}>
                    <h2>Current Balance</h2>
                    <p>{refresh}</p>
                </div>
                <div className={styles.paymentStatus}>
                    <h2>Current Payment Status</h2>
                    <p>{paymentStatus}</p>
                </div>
            </div>

            <div className={styles.paymentSteps}>
                <h1>Payment Steps</h1>
                <ol>
                    <li>1. Select the cryptocurrency gateway you want to use.</li>
                    <li>2. Copy the wallet address provided or generate QR. Scan the QR code to make the payment.</li>
                    <li>3. Send the exact amount of cryptocurrency to the address provided.</li>
                    <li>4. After completing the transaction, fill in "Payment Details" to finalize the process.</li>
                    <li>5. Make sure your payment has been sent before clicking "Submit Payment" to avoid fake payments.</li>
                </ol>
            </div>

            <div className={styles.addressContainer}>
                <div className={styles.address}>
                    <h3>BITCOIN</h3>
                    <p>bc1qfh2lmm73ns428hvz3lem30wl6z6fz7c0svq9ep</p>
                    <button onClick={() => handleCopyAddress('bc1qfh2lmm73ns428hvz3lem30wl6z6fz7c0svq9ep')}
                            className={styles.copyButton}>Copy Address
                    </button>
                </div>
                <div className={styles.address}>
                    <h3>ETHEREUM</h3>
                    <p>0xf813c0D54D56411eAa56331eC98409877C7DfD9a</p>
                    <button onClick={() => handleCopyAddress('0xf813c0D54D56411eAa56331eC98409877C7DfD9a')}
                            className={styles.copyButton}>Copy Address
                    </button>
                </div>
                <div className={styles.address}>
                    <h3>TETHER(USDT Trc20)</h3>
                    <p>TNw27WxtfUK4s48yTNeNA1eDQFg3DYqHUA</p>
                    <button onClick={() => handleCopyAddress('TNw27WxtfUK4s48yTNeNA1eDQFg3DYqHUA')} className={styles.copyButton}>Copy
                        Address
                    </button>
                </div>
                <div className={styles.address}>
                    <h3>LITECOIN(LTC)</h3>
                    <p>ltc1qfq72g4uslrhnqz63zddue3rjr3gsrtpetysrhk</p>
                    <button onClick={() => handleCopyAddress('ltc1qfq72g4uslrhnqz63zddue3rjr3gsrtpetysrhk')} className={styles.copyButton}>Copy
                        Address
                    </button>
                </div>
                <div className={styles.address}>
                    <h3>RIPPLE(XRP)</h3>
                    <p>ra9ueQpBvUXpbqd3AwgxqFBWDkQP4xJE9B</p>
                    <button onClick={() => handleCopyAddress('ra9ueQpBvUXpbqd3AwgxqFBWDkQP4xJE9B')} className={styles.copyButton}>Copy
                        Address
                    </button>
                </div>
                <div className={styles.address}>
                    <h3>SOLANA(SOL)</h3>
                    <p>3mhWA637WcJm6TmzEvtD9RNDwem6sXbQDSJ8wZGXYkXF</p>
                    <button onClick={() => handleCopyAddress('3mhWA637WcJm6TmzEvtD9RNDwem6sXbQDSJ8wZGXYkXF')} className={styles.copyButton}>Copy
                        Address
                    </button>
                </div>
            </div>

            <div className={styles.paymentDetails}>
                <h2>Payment Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="amount">Enter Amount (min $100):</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            min="100"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="gateway">Select Gateway:</label>
                        <select
                            id="gateway"
                            value={gateway}
                            onChange={(e) => setGateway(e.target.value)}
                        >
                            <option value="Bitcoin">BITCOIN</option>
                            <option value="Ethereum">ETHEREUM</option>
                            <option value="Tether">TETHER(USDT Trc20)</option>
                            <option value="Litcoin">LITCOIN(LTC)</option>
                            <option value="Ripple">RIPPLE(XRP)</option>
                            <option value="Solana">SOLANA(SOL)</option>
                        </select>
                    </div>

                    <p className={styles.note}>
                        Please transfer to the deposit address provided. Sending other currencies or tokens to this
                        address may result in the loss of your deposit.<br/>
                        Depositing to the above address requires confirmation. It will be credited automatically after 3
                        confirmations.<br/>
                        Minimum deposit amount: $100. Any deposit less than the minimum will not be credited or
                        refunded.<br/>
                        You can leave or close this page after submitting a payment, and wait for our confirmation.
                    </p>

                    <button
                        type="submit"
                        className={`w-full mt-2 p-3 rounded-md focus:outline-none focus:ring ${
                            isClicked ? 'bg-white text-black' : 'bg-yellow-500 text-white'
                        }`}  // Change color based on the clicked state
                        onClick={handleSubmit} // Link the function here
                    >
                        Submit Payment
                    </button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

export default DepositPage;
