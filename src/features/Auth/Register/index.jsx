import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import hidePasswordImg from "../AdminLogin/images/img.png";
import showPasswordImg from "../AdminLogin/images/icons8-eye-30.png";
import styles from './index.module.css';

const Register = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        country: '',
        phoneNumber: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:8086/api/v1/customer/countries');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleCountryChange = (e) => {
        const selectedCountry = countries.find(
            (country) => country.countryName === e.target.value
        );
        if (selectedCountry) {
            setSelectedCountry(selectedCountry.countryName);
            setSelectedCountryCode(selectedCountry.phoneCode);
            setFormData({
                ...formData,
                country: selectedCountry.countryName,
                phoneNumber: selectedCountry.phoneCode
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("The formData: ", formData);

        try {
            const response = await fetch('http://localhost:8086/api/v1/customer/register', {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response) {
                Toastify({
                    text: "Successfully Registered! Please check your email to continue with the registration.",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
                }).showToast();

                navigate('/wmessage');
            }

        } catch (error) {
            Toastify({
                text: "Registration failed!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
            }).showToast();
            console.error("Error:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <img
                    src={require('./images/img_1.png')}
                    alt="Registration illustration"
                    className={styles.image}
                />

                <form onSubmit={handleSubmit} className={styles.formSection}>
                    <h2 className={styles.heading}>User Registration</h2>

                    <div className={styles.inputGroup}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password (8+ characters, 1 letter, 1 number)"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className={styles.toggleButton}
                            >
                                <img
                                    src={showPassword ? hidePasswordImg : showPasswordImg}
                                    alt={showPassword ? 'Hide password' : 'Show password'}
                                />
                            </button>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Country</label>
                        <select value={selectedCountry} onChange={handleCountryChange} required>
                            <option value="" disabled>Select a country</option>
                            {countries.map((country) => (
                                <option key={country.countryName} value={country.countryName}>
                                    {country.countryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.button}>Register</button>

                    <div className={styles.link}>
                        Already registered?
                        <button type="button" onClick={() => navigate('/login')}>
                            Login Here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
