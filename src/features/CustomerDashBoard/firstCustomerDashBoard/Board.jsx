import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { Wallet, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Settings, LogOut, Home, Menu, X, Copy, Check } from 'lucide-react';

const Board = ({
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
    const [balances, setBalance] = useState(10);
    const [status, setStatus] = useState("Nil");
    const [bonus, setBonus] = useState(10);
    const [transactionId, setTransactionId] = useState(null);
    const [pendingDeposit, setPendingDeposit] = useState(null);
    const [id, setId] = useState(0);
    const [refresh, setRefreshWallet] = useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const adminWalletId = 'binance_wallet_id';
    const navigate = useNavigate();
    const userId = sessionStorage.getItem("customerId");

    useEffect(() => {
    }, [userId]);

    const handleCopyWalletId = () => {
        navigator.clipboard.writeText(adminWalletId);
        setCopied(true);
        toast('Admin Wallet ID copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDeposit = async () => {
        if (!userId) {
            toast('User is not logged in or session expired.');
            return;
        }

        try {
            const payload = {
                customerId: userId,
                coinType: coinType,
                amount: depositAmount,
            };

            const response = await axios.post('http://localhost:8086/api/v1/customer/addFunds', payload);
            const { id, paymentStatus, walletId } = response.data;
            sessionStorage.setItem("amountToDeposit", id);
            setId(walletId);
            setTransactionId(id);
            setStatus(paymentStatus);
            toast(`Payment initiated. Payment ID: ${id}. Status: ${paymentStatus}`);

            if (paymentStatus === 'pending') {
                setPendingDeposit(id);
                toast('Payment is pending. Awaiting admin approval.');
            } else if (paymentStatus === 'approved') {
                toast('Payment approved. Balance updated!');
            }
        } catch (error) {
            console.error('Deposit failed:', error);
            const errorMessage = error.response?.data?.message || 'Failed to deposit. Please try again later.';
            toast(`Error: ${errorMessage}`);
        }
    };

    const handleInvestment = async () => {
        if (!userId || !investmentPlan || !investmentAmount) {
            toast('Please ensure you are logged in and have set an investment plan.');
            return;
        }

        try {
            const payload = {
                customerId: userId,
                planType: investmentPlan,
                amount: investmentAmount,
            };

            const response = await axios.post('http://localhost:8086/api/v1/customer/initiateTrade', payload);
            const { tradeStatus, updatedAmount, tradeStats } = response.data;

            if (tradeStatus === 'success') {
                setInvestmentAmount(updatedAmount);
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
        if (!userId) {
            toast('No deposit found for withdrawal. Please make a deposit first.');
            return;
        }

        try {
            const payload = {
                customerId: userId,
                coinType: coinType,
                amount: withdrawAmount,
            };

            const response = await axios.post('http://localhost:8086/api/v1/customer/withdrawFunds', payload);
            const { paymentStatus, balance, id } = response.data;
            sessionStorage.setItem("amountToDeposit", id);
            setId(id);
            setTransactionId(id);
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

    const checkForApproval = async () => {
        if (!pendingDeposit) return;

        try {
            const response = await axios.get(`http://localhost:8086/api/v1/customer/checkDepositStatus/${pendingDeposit}`);
            const { paymentStatus, balance: updatedBalance } = response.data;

            if (paymentStatus === 'approved') {
                setBalance(updatedBalance);
                setPendingDeposit(null);
                toast('Deposit approved by admin. Balance updated.');
            }
        } catch (error) {
            console.error('Failed to check approval status:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            checkForApproval();
        }, 5000);

        return () => clearInterval(interval);
    }, [pendingDeposit]);

    const handleInvest = async () => {
        try {
            const payload = {
                coinType,
                investmentAmount,
                investmentPlan,
                userId,
            };

            await axios.post(investUrl, payload);
            toast(investSuccessMessage);
        } catch (error) {
            console.error('Investment failed:', error);
            toast(`Error: ${error.response?.data?.message || 'Failed to invest.'}`);
        }
    };

    const handleLogout = () => {
        toast("You have been logged out.");
        navigate('/login');
    };

    const refreshWallet = async (walletId) => {
        try {
            const response = await fetch(`http://localhost:8086/api/v1/customer/viewCustomerWallet/${walletId}`, {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error('Failed to refresh dashboard');
            }
            const deResponse = await response.json();
            setRefreshWallet(deResponse?.balance);
            return response.json();
        } catch (error) {
            console.error('Refresh wallet error:', error);
        }
    };

    const walletId = sessionStorage.getItem('walletId');

    useEffect(() => {
        if (walletId) {
            refreshWallet(walletId).catch(error => {
                console.error('Error checking for approval:', error);
            });
        }
    }, [id]);

    const handleSettings = () => {
        navigate('/settings');
    };

    const coinOptions = ['Bitcoin', 'Ethereum', 'Dogecoin', 'USDT', 'Solace', 'Binance', 'XRP', 'USDC', 'Ton', 'ADA', 'Shiba Inu', 'Avax', 'DOT', 'BCH', 'Silver', 'Platinum', 'Gold'];
    const investmentPlans = ['Basic', 'Master', 'Silver', 'Platinum', 'Executive', 'Premium', 'Gold'];

    const navItems = [
        { name: 'Deposit', icon: ArrowDownToLine, section: 'Deposit' },
        { name: 'Invest', icon: TrendingUp, section: 'Invest' },
        { name: 'Withdraw', icon: ArrowUpFromLine, section: 'Withdraw' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-purple-800/80 backdrop-blur-sm rounded-lg hover:bg-purple-700 transition-all"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-purple-900/95 to-indigo-950/95 backdrop-blur-xl border-r border-purple-500/20 p-6 flex flex-col justify-between z-40 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div>
                    <div className="flex items-center gap-3 mb-10 mt-12 lg:mt-0">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg">
                            <Wallet size={28} />
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">CryptoHub</h2>
                    </div>
                    
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.section}
                                onClick={() => {
                                    setCurrentSection(item.section);
                                    setIsSidebarOpen(false);
                                }}
                                className={`flex items-center gap-3 w-full py-3 px-4 rounded-xl transition-all ${
                                    currentSection === item.section
                                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30'
                                        : 'hover:bg-purple-800/50'
                                }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="space-y-2 border-t border-purple-500/20 pt-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 w-full py-3 px-4 rounded-xl hover:bg-purple-800/50 transition-all"
                    >
                        <Home size={20} />
                        <span>Home</span>
                    </button>
                    <button
                        onClick={handleSettings}
                        className="flex items-center gap-3 w-full py-3 px-4 rounded-xl hover:bg-purple-800/50 transition-all"
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full py-3 px-4 rounded-xl hover:bg-red-500/20 text-red-300 transition-all"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
                />
            )}

            {/* Main Content */}
            <div className="lg:ml-72 p-4 sm:p-6 lg:p-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 text-center lg:text-left mt-16 lg:mt-0">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-purple-300/70 text-sm sm:text-base">Manage your crypto portfolio seamlessly</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-purple-800/40 to-indigo-900/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl">
                            <p className="text-purple-300/70 text-sm mb-1">Current Balance</p>
                            <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                ${refresh || '0.00'}
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-800/40 to-indigo-900/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl">
                            <p className="text-purple-300/70 text-sm mb-1">Status</p>
                            <p className={`text-2xl sm:text-3xl font-bold ${status === 'approved' ? 'text-green-400' : status === 'pending' ? 'text-yellow-400' : 'text-purple-300'}`}>
                                {status}
                            </p>
                        </div>
                    </div>

                    {/* Main Card */}
                    <div className="bg-gradient-to-br from-purple-800/40 to-indigo-900/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/20 shadow-2xl">
                        {currentSection === 'Deposit' && (
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                                    <ArrowDownToLine className="text-green-400" size={28} />
                                    Deposit Funds
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-purple-200 font-medium mb-2 text-sm">Coin Type</label>
                                        <select
                                            value={coinType}
                                            onChange={(e) => setCoinType(e.target.value)}
                                            className="w-full p-3 bg-purple-900/50 backdrop-blur-sm text-white rounded-xl border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        >
                                            {coinOptions.map(coin => (
                                                <option key={coin} value={coin}>{coin}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-purple-200 font-medium mb-2 text-sm">Amount</label>
                                        <input
                                            type="number"
                                            value={depositAmount}
                                            onChange={(e) => setDepositAmount(e.target.value)}
                                            className="w-full p-3 bg-purple-900/50 backdrop-blur-sm text-white rounded-xl border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-purple-200 font-medium mb-2 text-sm">Admin Wallet Address</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={adminWalletId}
                                                readOnly
                                                className="flex-1 p-3 bg-purple-900/50 backdrop-blur-sm text-white rounded-xl border border-purple-500/30"
                                            />
                                            <button
                                                onClick={handleCopyWalletId}
                                                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-lg"
                                            >
                                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <button
                                            onClick={handleDeposit}
                                            className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all font-semibold shadow-lg shadow-green-500/30 text-lg"
                                        >
                                            Confirm Deposit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentSection === 'Invest' && (
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                                    <TrendingUp className="text-blue-400" size={28} />
                                    Investment
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-purple-200 font-medium mb-2 text-sm">Amount</label>
                                        <input
                                            type="number"
                                            value={investmentAmount}
                                            onChange={(e) => setInvestmentAmount(e.target.value)}
                                            className="w-full p-3 bg-purple-900/50 backdrop-blur-sm text-white rounded-xl border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-purple-200 font-medium mb-2 text-sm">Investment Plan</label>
                                        <select
                                            value={investmentPlan}
                                            onChange={(e) => setInvestmentPlan(e.target.value)}
                                            className="w-full p-3 bg-purple-900/50 backdrop-blur-sm text-white rounded-xl border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        >
                                            {investmentPlans.map(plan => (
                                                <option key={plan} value={plan}>{plan}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-purple-200 font-medium mb-2 text-sm">Coin Type</label>
                                        <select
                                            value={coinType}
                                            onChange={(e) => setCoinType(e.target.value)}
                                            className="w-full p-3 bg-purple-900/50 backdrop-blur-sm text-white rounded-xl border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        >
                                            {coinOptions.map(coin => (
                                                <option key={coin} value={coin}>{coin}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-4 rounded-xl border border-yellow-500/30 w-full">
                                            <p className="text-purple-200 text-sm mb-1">Current Bonus</p>
                                            <p className="text-2xl font-bold text-yellow-400">${bonus}</p>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <button
                                            onClick={handleInvest}
                                            className="w-full p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold shadow-lg shadow-blue-500/30 text-lg"
                                        >
                                            Start Investment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentSection === 'Withdraw' && (
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                                    <ArrowUpFromLine className="text-orange-400" size={28} />
                                    Withdraw Funds
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-purple-200 font-medium mb-2 text-sm">Amount</label>
                                        <input
                                            type="number"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                            className="w-full p-3 bg-purple-900/50 backdrop-blur-sm text-white rounded-xl border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-purple-200 font-medium mb-2 text-sm">Coin Type</label>
                                        <select
                                            value={withdrawCoinType}
                                            onChange={(e) => setWithdrawCoinType(e.target.value)}
                                            className="w-full p-3 bg-purple-900/50 backdrop-blur-sm text-white rounded-xl border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        >
                                            {coinOptions.map(coin => (
                                                <option key={coin} value={coin}>{coin}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-purple-200 font-medium mb-2 text-sm">Your Wallet Address</label>
                                        <input
                                            type="text"
                                            value={customerWalletId}
                                            onChange={(e) => setCustomerWalletId(e.target.value)}
                                            className="w-full p-3 bg-purple-900/50 backdrop-blur-sm text-white rounded-xl border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            placeholder="Enter your wallet address"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <button
                                            onClick={handleWithdraw}
                                            className="w-full p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all font-semibold shadow-lg shadow-orange-500/30 text-lg"
                                        >
                                            Request Withdrawal
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Board;