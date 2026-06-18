import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

export const BackButton = ({color = "white"})=>{
    const navigate = useNavigate();

    const handleBack = ()=>{
        navigate(-1);
    };

    return  <button onClick={handleBack} className={`${styles.container}`} style={{color: `var(--${styles[color]})`}}>
                <FaArrowLeft fontSize={35}/>
            </button>
}