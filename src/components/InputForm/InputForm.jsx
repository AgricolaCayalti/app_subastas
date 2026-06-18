import { useRef } from 'react';
import './InputForm.css';

export const InputForm = ({
    icon, label, name, type="text", required = false, disabled = false, value = undefined, pattern = undefined,
    readOnly = false, onChange = undefined, onFocus= undefined, error = null
}) => {
    const inputRef = useRef();

    const handleClear = ()=>{
        inputRef.current.value = "";
        onChange({
            target: inputRef.current
        });
    };

    return  <div className="inputform-container">
                {icon &&
                    <div className="inputform-icon"> {icon} </div>
                }
                <input
                    ref={inputRef}
                    className={`inputform-input ${Boolean(error) ? "inputform-input-error": ""} ${Boolean(readOnly) ? "inputform-input-readonly": ""}`}
                    autoComplete="off" 
                    disabled = { disabled }
                    required = { required }
                    type={type} 
                    name={name} 
                    placeholder={label} 
                    value={value} 
                    onChange={onChange}
                    onFocus={onFocus}    
                    readOnly = {readOnly}
                    pattern={pattern}
                />
                {
                    type === "text" &&
                        <div  className="inputform-clear" onClick={handleClear}>
                            <svg viewBox="0 0 16 16" width="12" height="12">
                                <path d="M 1 1 L 15 15 M 1 15 L 15 1" fill="none" strokeWidth="2" stroke="currentColor" />
                            </svg>
                        </div>
                }
            </div>
};