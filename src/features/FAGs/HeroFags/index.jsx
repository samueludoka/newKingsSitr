import styles from "./index.module.css";
import { useCollapse } from 'react-collapsed';
import {useState} from "react";
import backg from "./images/img1.png";
const CollapsibleQuestion = ({ question, answer, isExpanded, onToggle }) => {
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    return (
        <div className={styles.content}>
            <p>{question}</p>
            <button {...getToggleProps({ onClick: onToggle })}>
                {isExpanded ? 'Show less' : 'Show more'}
            </button>
            <section {...getCollapseProps()}>
                <p className={styles.excerptWidget}>{answer}</p>
            </section>
        </div>
    );
}

const HeroFags = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleCollapse = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const questions = [
        {
            question: "* What is Nextcent?",
            answer: "Nextcent is a Special Purpose Vehicle (SPV) based in Zug, Switzerland. The purpose of the company is to issue ETPs listed on the SIX Swiss Exchange, on the Börse Stuttgart, on the Vienna Stock Exchange, and expecting on other European exchanges."
        },
        {
            question: "* Can I use all Crypto Assets as Underlying for my ETP?",
            answer: "No. The rules on which crypto assets can be used depend on local regulators and must be assessed on a case-by-case basis."
        },
        {
            question: "* How can I Buy an ETP Issued by Nextcent?",
            answer: "You can trade our ETPs as simply as trading stock through your own bank account or any brokerage firm with access to SIX Swiss Exchange, Börse Stuttgart, or to Vienna Stock Exchange using an ISIN, Valor, WKN, or ticker."
        },
        {
            question: "* What makes Nextcent Special?",
            answer: (
                <>
                    <span>Alpha generation: </span>We employ multiple analytical approaches (technical, fundamental, and quantitative) to drive discretionary investment decisions aimed to outperform the bitcoin holding strategy.<br/>
                    <span>Portfolio of top 15 cryptocurrencies: </span>We trade bitcoin against carefully selected altcoins limited to the top 15 cryptocurrencies for liquidity and risk management purposes.<br/>
                    <span>Risk management & value preservation: </span>Our actively managed approach can help to reduce the drawdown by exiting into fiat during downward crypto market moves.<br/>
                    <span>Flexible investment decision making: </span>We are in a position to promptly react to various market conditions – taking the best in times of high volatility or sideways trends.<br/>
                    <span>Consistent market monitoring: </span>Our research and trading team covers the market 24/7 to be able to react quickly to any changes.
                </>
            )
        },
        {
            question: "* What are the fees for buying an ETP Issued by Nextcent?",
            answer: "Nextcent is charging a management fee per annum and a performance fee above the high watermark. The fees are determined in the final term sheet of each product."
        },
        {
            question: "* Can I buy large quantities of ETPs without influencing the market price?",
            answer: "Yes. The investor can buy any quantity during the exchange trading hours. New ETPs, if needed, will be issued at market price or close to it. An ETP is a fully collateralized debt instrument that can be incrementally issued without limitation."
        }
    ];

    return (
        <div className={styles.mainContent}>
            <img src={backg} alt={""} className={styles.background}/>
            {questions.map((q, index) => (
                <CollapsibleQuestion
                    key={index}
                    question={q.question}
                    answer={q.answer}
                    isExpanded={expandedIndex === index}
                    onToggle={() => toggleCollapse(index)}
                />
            ))}
        </div>
    );
}

export default HeroFags;
