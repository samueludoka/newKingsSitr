import styles from "./index.module.css";

const FilledButton = ({color, text, textColor, padding, border}) =>{
    return(
        <div>
            <button style={{background: color, color:textColor, padding: padding, borderRadius: border}} className={styles.filledButton}>
                {text}
            </button>
        </div>
    )
}

export default FilledButton;