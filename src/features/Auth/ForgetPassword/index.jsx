import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import styles from './index.module.css';
import heroimage from './images/img.png'

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // Handle changes to the email input
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:8086/api/v1/customer/verify-email/${encodeURIComponent(email)}`;

            const response = await axios.post(url, { email });
            console.log('API Response:', response); // Debugging: Check the entire response

            const responseData = response.data;
            if (responseData && responseData.message === "OTP Sent") {
                sessionStorage.setItem('email', email);

                Toastify({
                    text: responseData.message,
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
                }).showToast();

                // Navigate to the OTP page
                navigate('/otp');
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            Toastify({
                text: "Error sending OTP! Please try again.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
            }).showToast();
            console.error("Failed to send OTP:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={heroimage} alt={""} className={styles.heroimage}/>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Forgot Password</h2>

                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email address"
                        className={styles.input}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                >
                    Submit
                </button>

                <div className={styles.footer}>
                    <p className={styles.reminderText}>
                        Remembered your password?{' '}
                        <button
                            type="button"
                            className={styles.link}
                            onClick={() => navigate('/login')}
                        >
                            Go back to login
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
