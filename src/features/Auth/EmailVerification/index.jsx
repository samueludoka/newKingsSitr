import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import styles from './index.module.css';
import heroimage from './images/img.png'

const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    // Handle OTP input field change
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    // Submit handler to verify OTP
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Retrieve the email from sessionStorage
            const savedEmail = sessionStorage.getItem('email');
            if (!savedEmail) {
                throw new Error('No email found in session storage.');
            }

            // Construct the URL with the saved email and the OTP from the input field
            const url = `http://localhost:8086/api/v1/customer/verifyOtp/${encodeURIComponent(otp)}/${encodeURIComponent(savedEmail)}`;

            // Make an API request to verify the OTP
            const response = await axios.post(url, { otp, email: savedEmail });
            console.log('API Response:', response); // Debugging: Check the entire response

            // Assuming the response has a `data` object with a `message` field
            const responseData = response.data;

            if (responseData) {
                // Show success notification
                Toastify({
                    text: "Email successfully verified",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
                }).showToast();

                // Navigate to a success page or next step
                navigate('/resetpassword');
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            // Show error notification if something goes wrong
            Toastify({
                text: "Error verifying OTP! Please try again.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
            }).showToast();
            console.error("Failed to verify OTP:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={heroimage} alt={""} className={styles.heroimage}/>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>OTP Verification</h2>

                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="otp">
                        Enter OTP
                    </label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="Enter the OTP sent to your email"
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
            </form>
        </div>
    );
};

export default OtpVerification;
