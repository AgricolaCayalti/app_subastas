import { useEffect, useState } from "react";
import Logo from "./../../assets/logo.png";
import styles from './Welcome.module.css'
import { useNavigate } from "react-router-dom";
import 'animate.css';

export const Welcome = ()=> {
    const navigate = useNavigate();
    const [leaving, setLeaving] = useState(false)

    useEffect(() => {
        const timer = setTimeout(()=>{
            navigate("/login",  {replace: true});
        }, 3300);

        return ()=>{
            clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(()=>{
            setLeaving(true);
        }, 2600);

        return ()=>{
            clearTimeout(timer);
        }
    }, []);

    return  <div className={`${styles.container} ${leaving && "animate__animated animate__fadeOut"}`}>
                <div className={`${styles.logo} animate__animated animate__fadeIn`}>
                    <img src={Logo} alt="Logo" />
                </div>
            </div>
};