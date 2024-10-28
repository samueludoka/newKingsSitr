import styles from "./index.module.css";

const FilledButton = ({color, text, textColor, padding, border, onClick}) =>{
    return(
        <div>
            <button
                onClick={onClick}
                style={{
                    background: color,
                    color: textColor,
                    padding: padding,
                    borderRadius: '8px',
                    border: `${border} solid ${color}`,
                }}
                className={styles.filledButton}
            >
                {text}
            </button>
        </div>
    )
}

export default FilledButton;