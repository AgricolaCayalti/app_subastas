import './InputLogin.css';

export const InputLogin = ({
    icon, label, name, type="text", required = false, placeholder = " "
}) => {

    const handleClear = ({currentTarget})=>{
        currentTarget.parentNode.children[1].value = ""
    };

    return  <div className="inputlogin-container">
                {icon &&
                    <div className="inputlogin-icon"> {icon} </div>
                }
                <input className="inputlogin-input" autoComplete="off" type={type} placeholder={placeholder} name={name} required={required}/>
                <label className="inputlogin-label" >{label}</label>
                <div type="button"  className="inputlogin-clear" aria-label="Clear input" onClick={handleClear}>
                    <svg viewBox="0 0 16 16" width="12" height="12">
                        <path d="M 1 1 L 15 15 M 1 15 L 15 1" fill="none" strokeWidth="2" stroke="currentColor" />
                    </svg>
                </div>
            </div>
};