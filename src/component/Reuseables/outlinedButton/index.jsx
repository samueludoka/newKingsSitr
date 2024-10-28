import style from "./index.module.css"

const OutlinedButton = ({borderColor, text, textColor, padding})=>{
    return(
        <div>
            <button style={{borderColor: borderColor, color: textColor, padding: padding}} className={style.outlinedBtn}>
                {text}
            </button>
        </div>
    )
}

export default OutlinedButton;