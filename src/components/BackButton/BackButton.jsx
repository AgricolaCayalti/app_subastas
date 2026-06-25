import { FaArrowLeft } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';
import { useUIStore } from '@/store/useUIStore';

export const BackButton = ({ color = "white" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toggleCheck } = useUIStore();
 
    const handleBack = () => {
        if (location.pathname === '/signup') toggleCheck();
        navigate(-1);
    }


    return <button onClick={handleBack} className={`${styles.container}`} style={{ color: `var(--${styles[color]})` }}>
        <FaArrowLeft fontSize={25} />
    </button>
}