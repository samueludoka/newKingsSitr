import styles from "../newDashBaord/customerNavbar.module.css";
import logo from "../newDashBaord/images/logo-no-background.png";
import backg from "../newDashBaord/images/img_11.png";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { Router, useNavigate } from "react-router-dom";
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
} from "react-icons/io5";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const CustomerNavbar = () => {
  const [chartData, setChartData] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [refresh, setRefreshWallet] = useState();
  const [isOpen, setIsOpen] = useState(false); // sidebar toggle
  const navigate = useNavigate();

  const walletId = sessionStorage.getItem("walletId");
  const investmentAmount = sessionStorage.getItem("investmentAmount") || "0";
  const totalWithdrawnAmount = sessionStorage.getItem("totalWithdrawnAmount") || "0";

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); // close menu after click on mobile
  };

  const refreshWallet = async (walletId) => {
    try {
      const response = await fetch(
        `http://localhost:8086/api/v1/customer/viewCustomerWallet/${walletId}`
      );
      if (!response.ok) throw new Error("Failed to refresh dashboard");
      const data = await response.json();
      setRefreshWallet(data?.balance);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (walletId) refreshWallet(walletId);
  }, [walletId]);

  useEffect(() => {
    const fetchOHLC = async () => {
      try {
        const response = await axios.get(
          "https://min-api.cryptocompare.com/data/v2/histohour",
          {
            params: {
              fsym: "BTC",
              tsym: "USD",
              limit: 24,
              api_key: "691894f917baad35409bb00095f13eaa2faf1655f975694633f95dfb859c9a44",
            },
          }
        );

        const ohlc = response.data.Data.Data;
        const labels = ohlc.map((e) => new Date(e.time * 1000).toLocaleTimeString());

        setChartData({
          labels,
          datasets: [
            { label: "Open", data: ohlc.map((e) => e.open), borderColor: "green" },
            { label: "High", data: ohlc.map((e) => e.high), borderColor: "blue" },
            { label: "Low", data: ohlc.map((e) => e.low), borderColor: "red" },
            { label: "Close", data: ohlc.map((e) => e.close), borderColor: "orange" },
          ],
        });
      } catch (e) {
        console.error("Error fetching OHLC data:", e);
      }
    };
    fetchOHLC();
  }, []);

  const referralLink = "https://yourwebsite.com/referral?code=123456";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch(() => setCopySuccess("Failed to copy"));
  };

  
  const handleNavClick = (path) => {
    navigate(path);
  }

  return (
    <div className={styles.wrapper}>
      {/* Mobile Toggle Button */}
      <button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </button>

      <div className={styles.wrapper}>
  {/* Sidebar */}
  <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
    <div className={styles.logoWrapper}>
      <img src={logo} alt="Logo" className={styles.logo} />
      {/* <h2>Dashboard</h2> */}
    </div>
    <ul className={styles.menu}>
      <h3>Funds</h3>
      <li onClick={() => handleNavigate("/deposit")}>
        <IoArrowDownCircleOutline size={20} /> Deposit Funds
      </li>
      <li onClick={() => handleNavigate("/withdraw")}>
        <IoArrowUpCircleOutline size={20} /> Withdraw Funds
      </li>
      <li onClick={() => handleNavigate("/invest")}>
        <IoTrendingUpOutline size={20} /> Invest Funds
      </li>

      <h3>Others</h3>
      <li>
        <IoKeyOutline size={20} /> Purchase Signals
      </li>
      <li>
        <IoDiamondOutline size={20} /> Upgrade Account
      </li>
      <li>
        <IoDocumentTextOutline size={20} /> My Plans
      </li>
      <li>
        <IoPersonCircleOutline size={20} /> Verify Account
      </li>
      <li onClick={()=>handleNavClick("/home")}>
        <IoHomeOutline size={20} /> Home
      </li>
      <li>
        <IoLogOutOutline size={20} /> Logout
      </li>
    </ul>
  </aside>

  {/* Main content */}
  <main className={styles.maincontent}>
    {/* Mobile Toggle Button */}
    <button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
    </button>

    <img src={backg} alt="background" className={styles.background} />
    <div className={styles.AccountBalance}>
      <div className={styles.depositBalance}>
        <p>Deposits</p>
        <p className="text-yellow-400 font-bold">${refresh}</p>
      </div>
      <div className={styles.profits}>
        <p>Invests</p>
        <p>Amount Invested: ${investmentAmount}</p>
      </div>
      <div className={styles.withdraw}>
        <p>Total Withdraw</p>
        <p>Total Withdrawn Amount: ${totalWithdrawnAmount}</p>
      </div>
    </div>

    <section className={styles.flexContainer}>
      <div className={styles.chartContainer}>
        <h2>Bitcoin OHLC Chart (Last 24 Hours)</h2>
        {chartData ? <Line data={chartData} /> : <p>Loading OHLC data...</p>}
      </div>

      <div className={styles.container}>
        <h1>Personal Referral Link</h1>
        <div className={styles.linkContainer}>
          <span className={styles.referralLink}>{referralLink}</span>
          <button onClick={copyToClipboard} className={styles.copyButton}>
            Copy
          </button>
        </div>
        {copySuccess && <p className={styles.copyMessage}>{copySuccess}</p>}
        <div className={styles.referralEx}>
          <h1>Referrals</h1>
          <p>
            Present our project to your friends, family, or community and enjoy the
            benefits. No active deposit is required to receive commissions.
          </p>
        </div>
      </div>
    </section>
  </main>
</div>

    </div>
  );
};

export default CustomerNavbar;
