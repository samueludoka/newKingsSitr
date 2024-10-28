import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";

const Board = ({
                   // userId,
                   depositSuccessMessage = "Deposit successful",
                   investSuccessMessage = "Investment completed",
                   withdrawSuccessMessage = "Withdrawal processed",
                   investUrl = 'https://localhost:8086/api/v1/customer/invest',
                   withdrawUrl = 'https://localhost:8086/api/v1/customer/withdraw'
               }) => {
    const [currentSection, setCurrentSection] = useState('Deposit');
    const [coinType, setCoinType] = useState('Bitcoin');
    const [depositAmount, setDepositAmount] = useState('');
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


    const adminWalletId = 'binance_wallet_id';
    const navigate = useNavigate();
    const userId =sessionStorage.getItem("customerId")

    // This can fetch user info if needed, e.g., from an API
    useEffect(() => {
    }, [userId]);

    const handleCopyWalletId = () => {
        navigator.clipboard.writeText(adminWalletId);
        toast('Admin Wallet ID copied to clipboard!');
    };

    const handleDeposit = async () => {
        console.log('handleDeposit triggered'); // Check if the function is invoked

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
                amount: depositAmount,
            };

            // Make the POST request to initiate the deposit
            const response = await axios.post('http://localhost:8086/api/v1/customer/addFunds', payload);
            console.log(response,'the response');

            const { id, paymentStatus,  walletId } = response.data;
            console.log(walletId,'the id')
            sessionStorage.setItem("amountToDeposit", id);
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
    };

    const handleInvestment = async () => {
        console.log('handleInvestment triggered');

        // Check if userId and investment details are available
        if (!userId || !investmentPlan || !investmentAmount) {
            toast('Please ensure you are logged in and have set an investment plan.');
            return;
        }

        function updateTradingStats(tradeStats) {

        }

        try {
            // Create the payload with investment details
            const payload = {
                customerId: userId,
                planType: investmentPlan, // Example: 'aggressive', 'conservative', etc.
                amount: investmentAmount,
                // coinType: selectedCoinType, // Optional if your system supports multiple coin types
            };

            // Make the POST request to initiate the trade based on the investment plan
            const response = await axios.post('http://localhost:8086/api/v1/customer/initiateTrade', payload);
            console.log(response, 'trade initiation response');

            const { tradeStatus, updatedAmount, tradeFlow, tradeStats } = response.data;

            // Update UI based on trade flow
            if (tradeStatus === 'success') {
                // Update investment amount (increased or decreased based on trade flow)
                setInvestmentAmount(updatedAmount);
                // Show trading stats (e.g., how the trade is performing)
                updateTradingStats(tradeStats);
                toast(`Trade successful! Investment amount updated to ${updatedAmount}.`);
            } else if (tradeStatus === 'pending') {
                toast('Trade is pending. Awaiting further updates.');
            } else {
                toast('Trade failed. Please try again later.');
            }

        } catch (error) {
            console.error('Trade initiation failed:', error);
            const errorMessage = error.response?.data?.message || 'Failed to initiate trade. Please try again later.';
            toast(`Error: ${errorMessage}`);
        }
    };

    const handleWithdraw = async () => {
        console.log('handleWithdraw triggered');

        // Retrieve the deposit transaction ID from session storage
        const transactionId = sessionStorage.getItem("amountToDeposit");

        if (!userId) {
            toast('No deposit found for withdrawal. Please make a deposit first.');
            return;
        }

        try {
            const payload = {
                // transactionId: transactionId,
                customerId: userId, // Assuming the userId is available in your session
                coinType: coinType,
                amount: withdrawAmount, // This is the amount the user wants to withdraw
            };

            // Make the POST request to initiate the withdrawal
            const response = await axios.post('http://localhost:8086/api/v1/customer/withdrawFunds', payload);
            console.log( 'withdrawal response', response);

            const { paymentStatus, balance, id } = response.data;
            console.log(walletId,'the id')
            sessionStorage.setItem("amountToDeposit", id);
            setId(id)

            setTransactionId(id); // Set the transaction ID
            setStatus(paymentStatus);
            toast(`withdraw initiated. withdraw ID: ${id}. Status: ${paymentStatus}`);

            if (paymentStatus === 'pending') {
                setPendingDeposit(id);
                toast('Payment is pending. Awaiting admin approval.');
            } else if (paymentStatus === 'approved') {
                // If the payment is approved immediately, update balance
                // setBalance(newBalance);
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

    useEffect(() => {

    })

    // Use useEffect to check for approval periodically
    useEffect(() => {
        const interval = setInterval(() => {
            checkForApproval();
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [pendingDeposit]);


    const handleInvest = async () => {
        try {
            const payload = {
                coinType,
                investmentAmount,
                investmentPlan,
                userId, // Use the userId here
            };

            await axios.post(investUrl, payload);
            toast(investSuccessMessage);
        } catch (error) {
            console.error('Investment failed:', error);
            toast(`Error: ${error.response?.data?.message || 'Failed to invest.'}`);
        }
        toast(`Invested ${investmentAmount} in ${investmentPlan} plan with ${coinType}!`);
    };



    const handleLogout = () => {
        toast("You have been logged out.");
        navigate('/login');
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

    console.log("the refreshed",refresh)

    const handleSettings = () => {
        navigate('/settings');
    };    return (
        <div className="min-h-screen flex text-white bg-purple-900">
            <aside className="w-64 bg-purple-900 p-6 flex flex-col justify-between border-r border-purple-700">
                <div>
                    <h2 className="text-3xl font-bold mb-8 text-center">Menu</h2>
                    <nav className="space-y-4">
                        <button
                            onClick={() => setCurrentSection('Deposit')}
                            className="block w-full py-2 px-4 rounded bg-purple-800 hover:bg-purple-700"
                        >
                            Deposit
                        </button>
                        <button
                            onClick={() => setCurrentSection('Invest')}
                            className="block w-full py-2 px-4 rounded bg-purple-800 hover:bg-purple-700"
                        >
                            Invest
                        </button>
                        <button
                            onClick={() => setCurrentSection('Withdraw')}
                            className="block w-full py-2 px-4 rounded bg-purple-800 hover:bg-purple-700"
                        >
                            Withdraw
                        </button>
                    </nav>
                </div>

                <div className="mt-10">
                    <button
                        onClick={() => navigate('/')}
                        className="block w-full py-2 px-4 rounded hover:bg-transparent text-white"
                    >
                        Home
                    </button>
                    <button
                        onClick={handleSettings}
                        className="block w-full py-2 px-4 rounded hover:bg-transparent text-white"
                    >
                        Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        className="block w-full py-2 px-4 rounded hover:bg-transparent text-white"
                    >
                        Logout
                    </button>
                </div>
            </aside>


            {/* Main Content */}
            <div className="flex-grow p-8">
                <div className="max-w-6xl mx-auto bg-purple-800 rounded-lg shadow-md p-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white">Customer Dashboard</h1>
                        <p className="text-gray-300">Manage your investments, deposits, and withdrawals</p>
                    </div>

                    {/* Conditional Rendering Based on Current Section */}


                    {currentSection === 'Deposit' && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-semibold text-white mb-4">Deposit</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Coin Type */}
                                <div>
                                    <label className="block text-white font-semibold">coinType</label>
                                    <select
                                        value={coinType}
                                        onChange={(e) => setCoinType(e.target.value)}
                                        className="w-full mt-2 p-3 bg-purple-700 text-white rounded-md focus:outline-none focus:ring focus:border-purple-300"
                                    >
                                        <option>Bitcoin</option>
                                        <option>Ethereum</option>
                                        <option>Dogecoin</option>
                                        <option>USDT</option>
                                        <option>Solace</option>
                                        <option>Binance</option>
                                        <option>XRP</option>
                                        <option>USDC</option>
                                        <option>Ton</option>
                                        <option>ADA</option>
                                        <option>Shiba Inu</option>
                                        <option>Avax</option>
                                        <option>DOT</option>
                                        <option>BCH</option>
                                        <option>Silver</option>
                                        <option>Platinum</option>
                                        <option>Gold</option>
                                    </select>
                                </div>

                                {/* Amount */}
                                <div>
                                    <label className="block text-white font-semibold">Amount</label>
                                    <input
                                        type="number"
                                        value={depositAmount}
                                        onChange={(e) => setDepositAmount(e.target.value)}
                                        className="w-full mt-2 p-3 bg-purple-700 text-white rounded-md focus:outline-none focus:ring focus:border-purple-300"
                                        placeholder="Enter Amount"
                                    />
                                </div>

                                {/* Admin's Wallet ID */}
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-white font-semibold">Admin's Wallet ID</label>
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            value={adminWalletId}
                                            readOnly
                                            className="flex-grow p-3 bg-purple-700 text-white rounded-md focus:outline-none focus:ring focus:border-purple-300"
                                        />
                                        <button
                                            onClick={handleCopyWalletId}
                                            className="ml-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>

                                {/* Current Balance */}
                                <div>
                                    <p className="text-white">Current Balance: <span
                                        className="font-bold text-yellow-400">${refresh}</span></p>
                                </div>
                                <div>
                                    <p className="text-white">Current Status: <span
                                        className="font-bold text-yellow-400">{status}</span></p>
                                </div>

                                {/* Deposit Button */}
                                <div className="col-span-1 md:col-span-2 mt-4">
                                    <button
                                        onClick={handleDeposit}
                                        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    >
                                        Proceed with Deposit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentSection === 'Invest' && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-semibold text-white mb-4">Invest</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Investment Amount */}
                                <div>
                                    <label className="block text-white font-semibold">Amount</label>
                                    <input
                                        type="number"
                                        value={investmentAmount}
                                        onChange={(e) => setInvestmentAmount(e.target.value)}
                                        className="w-full mt-2 p-3 bg-purple-700 text-white rounded-md focus:outline-none focus:ring focus:border-purple-300"
                                        placeholder="Enter Amount"
                                    />
                                </div>

                                {/* Investment Plan */}
                                <div>
                                    <label className="block text-white font-semibold">Investment Plan</label>
                                    <select
                                        value={investmentPlan}
                                        onChange={(e) => setInvestmentPlan(e.target.value)}
                                        className="w-full mt-2 p-3 bg-purple-700 text-white rounded-md focus:outline-none focus:ring focus:border-purple-300"
                                    >
                                        <option>Basic</option>
                                        <option>Master</option>
                                        <option>Silver</option>
                                        <option>Platinum</option>
                                        <option>Executive</option>
                                        <option>Premium</option>
                                        <option>Gold</option>
                                    </select>
                                </div>

                                {/* Coin Type */}
                                <div>
                                    <label className="block text-white font-semibold">Coin Type</label>
                                    <select
                                        value={coinType}
                                        onChange={(e) => setCoinType(e.target.value)}
                                        className="w-full mt-2 p-3 bg-purple-700 text-white rounded-md focus:outline-none focus:ring focus:border-purple-300"
                                    >
                                        <option>Bitcoin</option>
                                        <option>Ethereum</option>
                                        <option>Dogecoin</option>
                                        <option>USDT</option>
                                        <option>Solace</option>
                                        <option>Binance</option>
                                        <option>XRP</option>
                                        <option>USDC</option>
                                        <option>Ton</option>
                                        <option>ADA</option>
                                        <option>Shiba Inu</option>
                                        <option>Avax</option>
                                        <option>DOT</option>
                                        <option>BCH</option>
                                        <option>Silver</option>
                                        <option>Platinum</option>
                                        <option>Gold</option>
                                    </select>
                                </div>

                                {/* Current Bonus */}
                                <div>
                                    <p className="text-white">Current Bonus: <span
                                        className="font-bold text-yellow-400">${bonus}</span></p>
                                </div>

                                {/* Invest Button */}
                                <div className="col-span-1 md:col-span-2 mt-4">
                                    <button
                                        onClick={handleInvest}
                                        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    >
                                        Proceed with Investment
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentSection === 'Withdraw' && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-semibold text-white mb-4">Withdraw</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Withdraw Amount */}
                                <div>
                                    <label className="block text-white font-semibold">Amount</label>
                                    <input
                                        type="number"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        className="w-full mt-2 p-3 bg-purple-700 text-white rounded-md focus:outline-none focus:ring focus:border-purple-300"
                                        placeholder="Enter Amount"
                                    />
                                </div>

                                {/* Coin Type */}
                                <div>
                                    <label className="block text-white font-semibold">Coin Type</label>
                                    <select
                                        value={withdrawCoinType}
                                        onChange={(e) => setWithdrawCoinType(e.target.value)}
                                        className="w-full mt-2 p-3 bg-purple-700 text-white rounded-md focus:outline-none focus:ring focus:border-purple-300"
                                    >
                                        <option>Bitcoin</option>
                                        <option>Ethereum</option>
                                        <option>Dogecoin</option>
                                        <option>USDT</option>
                                        <option>Solace</option>
                                        <option>Binance</option>
                                        <option>XRP</option>
                                        <option>USDC</option>
                                        <option>Ton</option>
                                        <option>ADA</option>
                                        <option>Shiba Inu</option>
                                        <option>Avax</option>
                                        <option>DOT</option>
                                        <option>BCH</option>
                                        <option>Silver</option>
                                        <option>Platinum</option>
                                        <option>Gold</option>
                                    </select>
                                </div>

                                {/* Customer Wallet ID */}
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-white font-semibold">Your Wallet ID</label>
                                    <input
                                        type="text"
                                        value={customerWalletId}
                                        onChange={(e) => setCustomerWalletId(e.target.value)}
                                        className="w-full mt-2 p-3 bg-purple-700 text-white rounded-md focus:outline-none focus:ring focus:border-purple-300"
                                        placeholder="Enter Your Wallet ID"
                                    />
                                </div>
                                <div>
                                    <p className="text-white">Current Balance: <span
                                        className="font-bold text-yellow-400">${refresh}</span></p>
                                </div>
                                <div>
                                    <p className="text-white">Current Status: <span
                                        className="font-bold text-yellow-400">{status}</span></p>
                                </div>

                                {/* Withdraw Button */}
                                <div className="col-span-1 md:col-span-2 mt-4">
                                    <button
                                        type='submit'
                                        onClick={handleWithdraw}
                                        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    >
                                        Proceed with Withdrawal
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );


}
export default Board;



