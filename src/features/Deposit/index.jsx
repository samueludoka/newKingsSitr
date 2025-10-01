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
} from 'react-icons/io5';
import logo from "../CustomerDashBoard/newDashBaord/images/logo-no-background.png";


const DepositPageRedesigned = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [gateway, setGateway] = useState('Bitcoin');
  const [message, setMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [refresh, setRefreshWallet] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('Nil');
  const [copySuccess, setCopySuccess] = useState('');
  

  const handleNavigate = (path) => {
    window.location.href = path;
    setIsOpen(false);
  };

  const cryptoAddresses = [
    { name: 'BITCOIN', address: 'bc1qfh2lmm73ns428hvz3lem30wl6z6fz7c0svq9ep' },
    { name: 'ETHEREUM', address: '0xf813c0D54D56411eAa56331eC98409877C7DfD9a' },
    { name: 'TETHER (USDT Trc20)', address: 'TNw27WxtfUK4s48yTNeNA1eDQFg3DYqHUA' },
    { name: 'LITECOIN (LTC)', address: 'ltc1qfq72g4uslrhnqz63zddue3rjr3gsrtpetysrhk' },
    { name: 'RIPPLE (XRP)', address: 'ra9ueQpBvUXpbqd3AwgxqFBWDkQP4xJE9B' },
    { name: 'SOLANA (SOL)', address: '3mhWA637WcJm6TmzEvtD9RNDwem6sXbQDSJ8wZGXYkXF' },
  ];

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopySuccess(address);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsClicked(true);
    setMessage(`Deposit of $${amount} using ${gateway} has been initiated.`);
    setTimeout(() => setIsClicked(false), 1000);
  };

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
          <li onClick={() => handleNavigate('/deposit')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)] bg-[rgba(255,150,11,0.3)]">
            <IoArrowDownCircleOutline size={20} /> Deposit Funds
          </li>
          <li onClick={() => handleNavigate('/withdraw')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)]">
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
            CRYPTOCURRENCY GATEWAY
          </h1>
          <p className="text-lg text-gray-300">Fast, Secure and Easy Payments</p>
        </div>

        {/* Balance Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[rgba(59,130,246,0.2)] border-2 border-blue-500 rounded-xl p-6 text-center">
            <h2 className="text-lg font-semibold mb-2 text-blue-300">Current Balance</h2>
            <p className="text-3xl font-bold text-white">${refresh}</p>
          </div>
          <div className="bg-[rgba(34,197,94,0.2)] border-2 border-green-500 rounded-xl p-6 text-center">
            <h2 className="text-lg font-semibold mb-2 text-green-300">Payment Status</h2>
            <p className="text-2xl font-bold text-white">{paymentStatus}</p>
          </div>
        </div>

        {/* Payment Steps */}
        <div className="bg-[rgba(255,255,255,0.1)] rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#ff960b] mb-4">Payment Steps</h2>
          <ol className="space-y-3 text-gray-200">
            <li className="flex gap-3">
              <span className="font-bold text-[#ff960b]">1.</span>
              <span>Select the cryptocurrency gateway you want to use.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ff960b]">2.</span>
              <span>Copy the wallet address provided or scan the QR code to make payment.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ff960b]">3.</span>
              <span>Send the exact amount of cryptocurrency to the address provided.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ff960b]">4.</span>
              <span>After completing the transaction, fill in "Payment Details" to finalize.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ff960b]">5.</span>
              <span>Ensure your payment is sent before clicking "Submit Payment".</span>
            </li>
          </ol>
        </div>

        {/* Crypto Addresses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {cryptoAddresses.map((crypto, index) => (
            <div
              key={index}
              className="bg-[rgba(255,255,255,0.1)] border border-[#ff960b] rounded-xl p-5"
            >
              <h3 className="text-lg font-bold text-[#ff960b] mb-3">{crypto.name}</h3>
              <p className="text-sm text-gray-300 break-all mb-3">{crypto.address}</p>
              <button
                onClick={() => handleCopyAddress(crypto.address)}
                className="w-full bg-[#ff960b] hover:bg-[#e57f00] text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                {copySuccess === crypto.address ? 'Copied!' : 'Copy Address'}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Details */}
        <div className="bg-[rgba(255,255,255,0.1)] rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#ff960b] mb-6">Payment Details</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold mb-2">
                Enter Amount (min $100):
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="100"
                className="w-full p-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#ff960b]"
                placeholder="$100"
              />
            </div>

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
                <option value="Bitcoin">BITCOIN</option>
                <option value="Ethereum">ETHEREUM</option>
                <option value="Tether">TETHER (USDT Trc20)</option>
                <option value="Litecoin">LITECOIN (LTC)</option>
                <option value="Ripple">RIPPLE (XRP)</option>
                <option value="Solana">SOLANA (SOL)</option>
              </select>
            </div>

            <div className="bg-[rgba(255,150,11,0.1)] border-l-4 border-[#ff960b] p-4 text-sm text-gray-300 space-y-2">
              <p>⚠️ Please transfer to the deposit address provided. Sending other currencies may result in loss.</p>
              <p>⏱️ Depositing requires 3 confirmations for automatic credit.</p>
              <p>💰 Minimum deposit: $100. Any amount less will not be credited or refunded.</p>
              <p>✅ You can close this page after submitting and wait for confirmation.</p>
            </div>

            <button
              onClick={handleSubmit}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                isClicked
                  ? 'bg-white text-black'
                  : 'bg-[#ff960b] hover:bg-[#e57f00] text-white'
              }`}
            >
              Submit Payment
            </button>
          </div>

          {message && (
            <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300 text-center">
              {message}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DepositPageRedesigned;