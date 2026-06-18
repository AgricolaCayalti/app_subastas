import './ButtonForm.css';

export const ButtonForm = ({children, onClick, type="button", disabled = false, bgColor = "secondary"}) => {
    return <button type={type} disabled={disabled} className='button-form' onClick = {onClick} style={{backgroundColor: `var(--${bgColor})`, visibility: disabled ? `hidden` : 'visible'}}>{children}</button>
};