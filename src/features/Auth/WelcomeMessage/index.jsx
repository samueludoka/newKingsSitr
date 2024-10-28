import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import heroimage from './images/img.png'

const RegistrationSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={heroimage} alt={""} className={styles.heroimage}/>
            </div>
            <div className={styles.card}>
                <h2 className={styles.title}>Registration Successful</h2>
                <p className={styles.message}>
                    A message has been sent to you. Check your email to complete the registration process.
                </p>
                <button
                    className={styles.homeButton}
                    onClick={() => navigate('/')}
                >
                    Home
                </button>
            </div>
        </div>
    );
};

export default RegistrationSuccess;
