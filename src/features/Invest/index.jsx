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
  IoTimeOutline,
  IoTrophyOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';

import logo from "../CustomerDashBoard/newDashBaord/images/logo-no-background.png";


const InvestPageRedesigned = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coinType, setCoinType] = useState('');
  const [planType, setPlanType] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const [refresh, setRefreshWallet] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleNavigate = (path) => {
    window.location.href = path;
    setIsOpen(false);
  };

  const coinOptions = ['Bitcoin', 'Ethereum', 'Tether', 'Litecoin', 'Ripple', 'Solana'];

  const planOptions = [
    {
      label: 'BASIC',
      value: 'BASIC',
      multiplier: '1.09x',
      minAmount: 200,
      maxAmount: 5000,
      duration: '5 days',
      color: 'from-gray-500 to-gray-700',
      icon: '🥉',
    },
    {
      label: 'SILVER',
      value: 'SILVER',
      multiplier: '1.14x',
      minAmount: 5000,
      maxAmount: 7000,
      duration: '7 days',
      color: 'from-gray-400 to-gray-600',
      icon: '🥈',
    },
    {
      label: 'PLATINUM',
      value: 'PLATINUM',
      multiplier: '1.18x',
      minAmount: 11000,
      maxAmount: 21000,
      duration: '14 days',
      color: 'from-cyan-500 to-cyan-700',
      icon: '💎',
    },
    {
      label: 'MASTER',
      value: 'MASTER',
      multiplier: '1.23x',
      minAmount: 21000,
      maxAmount: 35000,
      duration: '21 days',
      color: 'from-purple-500 to-purple-700',
      icon: '👑',
    },
    {
      label: 'EXECUTIVE',
      value: 'EXECUTIVE',
      multiplier: '1.27x',
      minAmount: 35000,
      maxAmount: 50000,
      duration: '27 days',
      color: 'from-blue-500 to-blue-700',
      icon: '🎖️',
    },
    {
      label: 'PREMIUM',
      value: 'PREMIUM',
      multiplier: '1.30x',
      minAmount: 50000,
      maxAmount: 75000,
      duration: '30 days',
      color: 'from-orange-500 to-orange-700',
      icon: '⭐',
    },
    {
      label: 'GOLD',
      value: 'GOLD',
      multiplier: '1.35x',
      minAmount: 75000,
      maxAmount: 100000,
      duration: '35 days',
      color: 'from-yellow-400 to-yellow-600',
      icon: '🥇',
    },
  ];

  const handlePlanChange = (value) => {
    setPlanType(value);
    const plan = planOptions.find((p) => p.value === value);
    setSelectedPlan(plan);
  };

  const handleInvest = () => {
    setStatus({ loading: true, error: '', success: '' });

    if (!coinType || !planType || !amount) {
      setStatus({ loading: false, error: 'Please fill in all fields', success: '' });
      return;
    }

    if (selectedPlan && (parseFloat(amount) < selectedPlan.minAmount || parseFloat(amount) > selectedPlan.maxAmount)) {
      setStatus({
        loading: false,
        error: `Amount must be between $${selectedPlan.minAmount.toLocaleString()} and $${selectedPlan.maxAmount.toLocaleString()}`,
        success: '',
      });
      return;
    }

    setTimeout(() => {
      setStatus({ loading: false, error: '', success: 'Investment successful! Your funds are now working for you.' });
    }, 1500);
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

      {/* Sidebar */}
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
          <li onClick={() => handleNavigate('/withdraw')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)]">
            <IoArrowUpCircleOutline size={20} /> Withdraw Funds
          </li>
          <li onClick={() => handleNavigate('/invest')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-[rgba(255,150,11,0.2)] bg-[rgba(255,150,11,0.3)]">
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

      {/* Main Content */}
      <main className="flex-1 p-5 lg:p-8 overflow-y-auto pt-16 lg:pt-5 lg:ml-64">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#ff960b] mb-2">
            CRYPTOCURRENCY GATEWAY
          </h1>
          <p className="text-lg text-gray-300">Fast, Secure and Easy Payments</p>
        </div>

        {/* Current Balance */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-2 border-green-500 rounded-xl p-6 text-center mb-8">
          <h2 className="text-lg font-semibold mb-2 text-green-300">Current Balance</h2>
          <p className="text-4xl font-bold text-white">${refresh}</p>
        </div>

        {/* Investment Plans Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#ff960b] mb-4">Choose Your Investment Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planOptions.map((plan) => (
              <div
                key={plan.value}
                onClick={() => handlePlanChange(plan.value)}
                className={`cursor-pointer rounded-xl p-5 transition-all border-2 ${
                  planType === plan.value
                    ? 'border-[#ff960b] bg-[rgba(255,150,11,0.2)] scale-105'
                    : 'border-transparent bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]'
                }`}
              >
                <div className={`bg-gradient-to-br ${plan.color} rounded-lg p-4 mb-3`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{plan.icon}</span>
                    <IoTrophyOutline size={24} className="text-white/70" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{plan.label}</h3>
                  <p className="text-2xl font-bold text-white mt-1">{plan.multiplier}</p>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Min Amount:</span>
                    <span className="font-semibold text-white">${plan.minAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Amount:</span>
                    <span className="font-semibold text-white">${plan.maxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Duration:</span>
                    <span className="font-semibold text-[#ff960b] flex items-center gap-1">
                      <IoTimeOutline size={16} />
                      {plan.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Form */}
        <div className="bg-[rgba(255,255,255,0.1)] rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#ff960b] mb-6">Investment Details</h2>

          <div className="space-y-5">
            {/* Coin Selection */}
            <div>
              <label htmlFor="coinType" className="block text-sm font-semibold mb-2">
                1. Select Cryptocurrency Gateway:
              </label>
              <select
                id="coinType"
                value={coinType}
                onChange={(e) => setCoinType(e.target.value)}
                className="w-full p-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#ff960b]"
              >
                <option value="">Select Coin Type</option>
                {coinOptions.map((coin) => (
                  <option key={coin} value={coin}>
                    {coin}
                  </option>
                ))}
              </select>
            </div>

            {/* Plan Selection */}
            <div>
              <label htmlFor="planType" className="block text-sm font-semibold mb-2">
                2. Select Investment Plan:
              </label>
              <select
                id="planType"
                value={planType}
                onChange={(e) => handlePlanChange(e.target.value)}
                className="w-full p-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#ff960b]"
              >
                <option value="">Select Plan Type</option>
                {planOptions.map((plan) => (
                  <option key={plan.value} value={plan.value}>
                    {plan.label} ({plan.multiplier}) - Min: ${plan.minAmount.toLocaleString()}, Max: ${plan.maxAmount.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Input */}
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold mb-2">
                3. Enter Investment Amount:
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#ff960b]"
                placeholder="Enter Amount"
              />
              {selectedPlan && (
                <p className="text-xs text-gray-400 mt-2">
                  Acceptable range: ${selectedPlan.minAmount.toLocaleString()} - ${selectedPlan.maxAmount.toLocaleString()}
                </p>
              )}
            </div>

            {/* Selected Plan Info */}
            {selectedPlan && (
              <div className="bg-[rgba(255,150,11,0.1)] border-l-4 border-[#ff960b] p-4 rounded-r-lg">
                <h3 className="font-semibold text-[#ff960b] mb-2 flex items-center gap-2">
                  <IoCheckmarkCircleOutline size={20} />
                  Selected Plan: {selectedPlan.label}
                </h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Return Multiplier: <span className="text-white font-semibold">{selectedPlan.multiplier}</span></p>
                  <p>Investment Duration: <span className="text-white font-semibold">{selectedPlan.duration}</span></p>
                  {amount && parseFloat(amount) >= selectedPlan.minAmount && parseFloat(amount) <= selectedPlan.maxAmount && (
                    <p className="text-green-400 font-semibold mt-2">
                      Expected Return: ${(parseFloat(amount) * parseFloat(selectedPlan.multiplier.replace('x', ''))).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                onClick={handleInvest}
                disabled={status.loading}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  status.loading
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-[#ff960b] hover:bg-[#e57f00] text-white'
                }`}
              >
                {status.loading ? 'Processing Investment...' : '4. Invest Now'}
              </button>
            </div>

            <p className="text-center text-sm text-gray-400">
              5. Wait for the period of time associated with your selected investment plan.
            </p>
          </div>

          {/* Status Messages */}
          {status.error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-center">
              {status.error}
            </div>
          )}
          {status.success && (
            <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300 text-center">
              {status.success}
            </div>
          )}
        </div>

        {/* Investment Tips */}
        <div className="bg-[rgba(255,255,255,0.05)] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#ff960b] mb-4">Investment Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <span>Diversify your investments across different plans</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <span>Only invest amounts you can afford to lock for the duration</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <span>Higher returns come with longer investment periods</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <span>Monitor your investments regularly in "My Plans"</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestPageRedesigned;