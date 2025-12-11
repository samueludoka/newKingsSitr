import React, { useEffect, useState } from 'react';
import {
  IoHomeOutline,
  IoLogOutOutline,
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
  IoTrendingUpOutline,
  IoKeyOutline,
  IoPersonCircleOutline,
  IoDocumentTextOutline,
  IoDiamondOutline,
  IoMenu,
  IoClose,
  IoWalletOutline,
  IoAlertCircleOutline,
} from 'react-icons/io5';
import logo from "../CustomerDashBoard/newDashBaord/images/logo-no-background.png";

const WithdrawPageRedesigned = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [gateway, setGateway] = useState('Bitcoin');
  const [customerAddress, setCustomerAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [refresh, setRefreshWallet] = useState(0);
  const [status, setStatus] = useState('Nil');

  const handleNavigate = (path) => {
    window.location.href = path;
    setIsOpen(false);
  };

  const handleWithdraw = () => {
    // Validate wallet address
    if (!customerAddress || customerAddress.length < 23 || customerAddress.length > 46) {
      setMessage('Invalid wallet address. It must be between 23 and 46 characters.');
      return;
    }

    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      setMessage('Please enter a valid withdrawal amount.');
      return;
    }

    setIsClicked(true);
    setMessage(`Withdrawal of $${withdrawAmount} to ${gateway} wallet initiated. Awaiting admin approval.`);
    setTimeout(() => setIsClicked(false), 1000);
  };

  const cryptoGateways = [
    { value: 'Bitcoin', label: 'BITCOIN', placeholder: 'bc1q...' },
    { value: 'Ethereum', label: 'ETHEREUM', placeholder: '0x...' },
    { value: 'Tether', label: 'TETHER (USDT Trc20)', placeholder: 'T...' },
    { value: 'Litecoin', label: 'LITECOIN (LTC)', placeholder: 'ltc1q...' },
    { value: 'Ripple', label: 'RIPPLE (XRP)', placeholder: 'r...' },
    { value: 'Solana', label: 'SOLANA (SOL)', placeholder: '3m...' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#2d1b3d] text-white">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[1100] lg:hidden bg-transparent border-none text-white cursor-pointer"
      >
        {isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
      </button>

      {/* Sidebar - Fixed on all screens */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[rgba(10,14,39,0.95)] p-5 z-[1000] transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="text-center mb-8 cursor-pointer" onClick={() => handleNavigate('/customerDashboard2')}>
        <img src={logo} alt="Logo" className="w-[8rem]" />
        </div>

        <ul className="list-none p-0">
          <h3 className="text-sm font-semibold my-5 text-[#ff960b]">FUNDS</h3>
          <li onClick={() => handleNavigate('/deposit')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)]">
            <IoArrowDownCircleOutline size={20} /> Deposit Funds
          </li>
          <li onClick={() => handleNavigate('/withdraw')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)] bg-[rgba(255,150,11,0.3)]">
            <IoArrowUpCircleOutline size={20} /> Withdraw Funds
          </li>
          <li onClick={() => handleNavigate('/invest')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)]">
            <IoTrendingUpOutline size={20} /> Invest Funds
          </li>

          <h3 className="text-sm font-semibold my-5 text-[#ff960b]">OTHERS</h3>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)]">
            <IoKeyOutline size={20} /> Purchase Signals
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)]">
            <IoDiamondOutline size={20} /> Upgrade Account
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)]">
            <IoDocumentTextOutline size={20} /> My Plans
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)]">
            <IoPersonCircleOutline size={20} /> Verify Account
          </li>
          <li onClick={() => handleNavigate('/home')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)]">
            <IoHomeOutline size={20} /> Home
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)]">
            <IoLogOutOutline size={20} /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content - Margin added for desktop */}
      <main className="flex-1 p-5 lg:p-8 overflow-y-auto pt-16 lg:pt-5 lg:ml-64">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#ff960b] mb-2">
            CRYPTOCURRENCY AUTOMATIC GATEWAY
          </h1>
          <p className="text-lg text-gray-300">Fast, Secure and Easy Payments</p>
        </div>

        {/* Balance Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[rgba(239,68,68,0.2)] border-2 border-red-500 rounded-xl p-6 text-center">
            <h2 className="text-lg font-semibold mb-2 text-red-300">Current Balance</h2>
            <p className="text-3xl font-bold text-white">${refresh}</p>
          </div>
          <div className="bg-[rgba(34,197,94,0.2)] border-2 border-green-500 rounded-xl p-6 text-center">
            <h2 className="text-lg font-semibold mb-2 text-green-300">Payment Status</h2>
            <p className="text-2xl font-bold text-white">{status}</p>
          </div>
        </div>

        {/* Payment Steps */}
        <div className="bg-[rgba(255,255,255,0.1)] rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#ff960b] mb-4">Withdrawal Steps</h2>
          <ol className="space-y-3 text-gray-200">
            <li className="flex gap-3">
              <span className="font-bold text-[#ff960b]">&gt;&gt;</span>
              <span>Select the cryptocurrency gateway you want to use.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ff960b]">&gt;&gt;</span>
              <span>Paste your valid wallet address.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ff960b]">&gt;&gt;</span>
              <span>Fill the amount you want to withdraw.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ff960b]">&gt;&gt;</span>
              <span>Make sure the withdraw amount is less than the original balance by $100.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ff960b]">&gt;&gt;</span>
              <span>Click "Submit Payment" to continue.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ff960b]">&gt;&gt;</span>
              <span>Check your crypto wallet for funds.</span>
            </li>
          </ol>
        </div>

        {/* Withdrawal Form */}
        <div className="bg-[rgba(255,255,255,0.1)] rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#ff960b] mb-6">Withdrawal Details</h2>
          
          <div className="space-y-5">
            {/* Gateway Selection */}
            <div>
              <label htmlFor="gateway" className="block text-sm font-semibold mb-2">
                Select Gateway:
              </label>
              <select
                id="gateway"
                value={gateway}
                onChange={(e) => setGateway(e.target.value)}
                className="w-full p-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#ff960b]"
              >
                {cryptoGateways.map((crypto) => (
                  <option key={crypto.value} value={crypto.value}>
                    {crypto.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Wallet Address */}
            <div>
              <label htmlFor="walletAddress" className="block text-sm font-semibold mb-2">
                <IoWalletOutline className="inline mr-2" size={18} />
                {gateway} Wallet Address:
              </label>
              <input
                type="text"
                id="walletAddress"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder={
                  cryptoGateways.find((c) => c.value === gateway)?.placeholder ||
                  'Enter your wallet address'
                }
                className="w-full p-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#ff960b] font-mono text-sm"
              />
              <p className="text-xs text-gray-400 mt-2">
                Address must be between 23 and 46 characters
              </p>
            </div>

            {/* Withdrawal Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold mb-2">
                Withdrawal Amount:
              </label>
              <input
                type="number"
                id="amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                min="0"
                step="0.01"
                className="w-full p-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#ff960b]"
                placeholder="Enter withdrawal amount"
              />
            </div>

            {/* Important Notice */}
            <div className="bg-[rgba(239,68,68,0.1)] border-l-4 border-red-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <IoAlertCircleOutline size={24} className="text-red-400 flex-shrink-0 mt-1" />
                <div className="text-sm text-gray-300 space-y-2">
                  <p className="font-semibold text-red-300">Important Notice:</p>
                  <p>• Ensure your wallet address is correct. Incorrect addresses may result in permanent loss of funds.</p>
                  <p>• Withdrawals require admin approval and may take 24-48 hours to process.</p>
                  <p>• Minimum withdrawal amount must be at least $100 less than your current balance.</p>
                  <p>• Network fees may apply depending on the blockchain network.</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleWithdraw}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                isClicked
                  ? 'bg-white text-black'
                  : 'bg-[#ff960b] hover:bg-[#e57f00] text-white'
              }`}
            >
              Submit Withdrawal Request
            </button>

            <p className="text-center text-sm text-gray-400">
              After clicking submit, check the payment status and wait for admin approval.
            </p>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`mt-4 p-4 rounded-lg text-center ${
                message.includes('Invalid') || message.includes('Please')
                  ? 'bg-red-500/20 border border-red-500 text-red-300'
                  : 'bg-green-500/20 border border-green-500 text-green-300'
              }`}
            >
              {message}
            </div>
          )}
        </div>

        {/* Security Tips */}
        <div className="bg-[rgba(255,255,255,0.05)] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#ff960b] mb-4">Security Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <span>Always double-check your wallet address before submitting</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <span>Never share your private keys with anyone</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <span>Wait for admin confirmation before expecting funds</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <span>Contact support if your withdrawal is delayed beyond 48 hours</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WithdrawPageRedesigned;