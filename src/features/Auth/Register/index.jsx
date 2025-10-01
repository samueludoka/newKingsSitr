import React, { useState, useEffect } from 'react';
import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoGlobeOutline,
  IoCallOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';

const RegisterRedesigned = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    country: '',
    phoneNumber: '',
  });

  // Mock countries for demo
  useEffect(() => {
    const mockCountries = [
      { countryName: 'United States', phoneCode: '+1' },
      { countryName: 'United Kingdom', phoneCode: '+44' },
      { countryName: 'Canada', phoneCode: '+1' },
      { countryName: 'Nigeria', phoneCode: '+234' },
      { countryName: 'Ghana', phoneCode: '+233' },
      { countryName: 'South Africa', phoneCode: '+27' },
    ];
    setCountries(mockCountries);
  }, []);

  const handleCountryChange = (e) => {
    const country = countries.find((c) => c.countryName === e.target.value);
    if (country) {
      setSelectedCountry(country.countryName);
      setSelectedCountryCode(country.phoneCode);
      setFormData({
        ...formData,
        country: country.countryName,
        phoneNumber: country.phoneCode,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({
      type: 'success',
      text: 'Successfully Registered! Please check your email to continue.',
    });
    
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#2d1b3d] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#ffd700] to-[#ffd700] p-12 text-black">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center">
                <IoCheckmarkCircleOutline size={50} className="text-black" />
              </div>
              <h1 className="text-4xl font-bold">Welcome!</h1>
              <p className="text-xl opacity-90">Join thousands of investors worldwide</p>
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  <span>Secure cryptocurrency trading</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  <span>Multiple investment plans</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400 mb-8">Start your investment journey today</p>

              <div className="space-y-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Choose a username"
                      className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="8+ characters, 1 letter, 1 number"
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
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <IoGlobeOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
                    <select
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#ffd700] transition-colors appearance-none"
                      required
                    >
                      <option value="" className="bg-[#1a1f3a]">Select your country</option>
                      {countries.map((country) => (
                        <option key={country.countryName} value={country.countryName} className="bg-[#1a1f3a]">
                          {country.countryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <IoCallOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.3)] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-[#ffd700]  text-black font-bold rounded-lg transition-all mt-6"
                >
                  Create Account
                </button>

                {/* Success Message */}
                {message.text && (
                  <div className={`p-4 rounded-lg text-center ${
                    message.type === 'success' 
                      ? 'bg-green-500/20 border border-green-500 text-green-300'
                      : 'bg-red-500/20 border border-red-500 text-red-300'
                  }`}>
                    {message.text}
                  </div>
                )}

                {/* Login Link */}
                <div className="text-center text-gray-400 mt-6">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => (window.location.href = '/login')}
                    className="text-[#ffd700] hover:text-[#e8e185] font-semibold transition-colors"
                  >
                    Login Here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRedesigned;