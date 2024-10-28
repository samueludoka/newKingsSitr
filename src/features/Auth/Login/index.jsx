import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import hidePasswordImg from "../AdminLogin/images/img.png";
import showPasswordImg from "../AdminLogin/images/icons8-eye-30.png";
import styles from './index.module.css';
import heroimage from './images/img_1.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Both email and password are required.');
            toast.error('Both email and password are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8086/api/v1/customer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error('Login failed.');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            if (data?.id) {
                sessionStorage.setItem("customerId", data.id);
                sessionStorage.setItem("walletId", data.walletId);

                toast.success('Login successful!');
                console.log(sessionStorage.getItem("walletId"));

                navigate('/customerDashboard2');
            } else {
                throw new Error('Customer ID not found in response.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError(err.message);
            toast.error(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={heroimage} alt={""} className={styles.heroimage}/>
            </div>
            {/*<ToastContainer />*/}
            <div className={styles.card}>
                <h2 className={styles.title}>Login</h2>
                {error && <div className={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className={styles.inputLabel}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={styles.inputField}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <p className={styles.helperText}>Please enter a valid email address.</p>
                    </div>

                    <div className={`${styles.passwordContainer} relative mb-4`}>
                        <label htmlFor="password" className={styles.inputLabel}>
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className={styles.inputField}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.toggleButton}
                        >
                            <img
                                src={showPassword ? hidePasswordImg : showPasswordImg}
                                alt={showPassword ? 'Hide password' : 'Show password'}
                                className={styles.toggleIcon}
                            />
                        </button>
                        <p className={styles.helperText}>Your password must be at least 8 characters long.</p>
                    </div>

                    <div className="mt-2 text-center">
                        <button
                            type="button"
                            className={styles.forgotPassword}
                            onClick={() => navigate('/forget-password')}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <div className="flex items-center justify-between" style={{paddingTop: '1rem', paddingBottom: '1rem'}}>
                        <button
                            type="submit"
                            className={styles.button}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
