import React, { useState } from 'react';
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForwardOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';

const LoginRedesigned = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/customerDashboard2';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#2d1b3d] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Branding with Image */}
          <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#ffd700] to-[#ffd700] p-12 text-black relative overflow-hidden">
           
            
            <div className="text-center space-y-6 relative z-10">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center">
                <IoShieldCheckmarkOutline size={50} className="text-black" />
              </div>
              <h1 className="text-4xl font-bold">Welcome Back!</h1>
              <p className="text-xl opacity-90">Access your investment portfolio</p>
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  <span>Track your investments in real-time</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  <span>Secure transactions & deposits</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  <span>Manage withdrawals easily</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-12 flex items-center">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
                <p className="text-gray-400">Enter your credentials to access your account</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-5">
          
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <IoMailOutline
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700] transition-colors"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Please enter a valid email address</p>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <IoLockClosedOutline
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700] transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Your password must be at least 8 characters long
                  </p>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => (window.location.href = '/forget-password')}
                    className="text-[#ffd700] hover:text-[#e3d279] text-sm font-semibold transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    isLoading
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-[#ffd700]  text-black'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
                      <IoArrowForwardOutline size={20} />
                    </>
                  )}
                </button>

                {/* Register Link */}
                <div className="text-center text-gray-400 mt-6">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => (window.location.href = '/sign-up')}
                    className="text-[#ffd700] hover:text-[#e3d279] font-semibold transition-colors"
                  >
                    Register Here
                  </button>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-8 p-4 bg-[rgba(255,150,11,0.1)] border border-[#ff960b]/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <IoShieldCheckmarkOutline size={20} className="text-[#ff960b] flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-400">
                    Your connection is secure. We protect your data with industry-standard encryption.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRedesigned;