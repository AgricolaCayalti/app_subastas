import { useEffect, useRef } from 'react';
import styles from './InputFormMoney.module.css';

export const InputFormMoney = ({
    icon, label, imperativeAutofocus = false, ...props
}) => {
    const inputRef = useRef();

    const handleClear = ()=>{
        inputRef.current.value = "";
    };

    useEffect(()=>{
        if (imperativeAutofocus){
            setTimeout(()=>{
                inputRef.current.focus();
            }, 300);
        }
    }, []);

    return  <div>
                <label style={{fontWeight:300}}>{label}</label>
                <div className={`${styles.inputformContainer} ${props.readOnly ? styles.readOnly : ""}`}>
                    {icon &&
                        <div className={styles.inputformIcon}> {icon} </div>
                    }
                    <input 
                        {...props}
                        ref={inputRef} 
                        //step={0.01}
                        //readOnly = { readOnly }
                        //value={ value }
                        //style={readOnly ? {'background': "var(--gray)", color: "white"}  : {}}
                        placeholder='0.00'
                        className={styles.inputformInput} autoComplete="off"/>
                    {
                        props.type === "text" &&
                            <button type="button"  className={styles.inputformClear} onClick={handleClear}>
                                <svg viewBox="0 0 16 16" width="12" height="12">
                                    <path d="M 1 1 L 15 15 M 1 15 L 15 1" fill="none" strokeWidth="2" stroke="currentColor" />
                                </svg>
                            </button>
                    }
                </div>
            </div>

};