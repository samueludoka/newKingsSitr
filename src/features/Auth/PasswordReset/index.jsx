import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./index.module.css"
import heroimage from "./images/img.png"

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const savedEmail = sessionStorage.getItem('email');
        console.log('Saved Email:', savedEmail);
        if (!savedEmail) {
            setMessage('No email found in session storage.');
            return;
        }

        if (password !== reEnterPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        try {
            const url = `http://localhost:8086/api/v1/customer/changePassword/${encodeURIComponent(savedEmail)}`;
            console.log('Constructed URL:', url);

            await axios.post(url, {
                password: password,
                repeatPassword: reEnterPassword
            });
            setMessage('Password has been reset successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message || error);
            setMessage('Error occurred while resetting the password.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={heroimage} alt={""} className={styles.heroimage}/>
            </div>
            <div className={styles.formcontainer}>
                <h2>Reset Password</h2>
                <form>
                    <div className={styles.formgroup}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your new password"
                        />
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="reEnterPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="reEnterPassword"
                            value={reEnterPassword}
                            onChange={(e) => setReEnterPassword(e.target.value)}
                            required
                            placeholder="Re-enter your new password"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className={styles.submitbutton}
                    >
                        Submit
                    </button>
                </form>
                {message && (
                    <p className="message">{message}</p>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
