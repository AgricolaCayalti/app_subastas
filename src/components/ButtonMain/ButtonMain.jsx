import './ButtonMain.css';

export const ButtonMain = ({children, onClick, type="button", disabled = false, bgColor = "primary", ftColor = "white", fontSize = undefined}) => {
    return <button type={type} className={`button-main`} 
                style={{fontSize: fontSize, color : `var(--${ftColor})`, backgroundColor : `var(--${bgColor})`}} 
                disabled = {disabled} onClick = {onClick}>{children}</button>
};