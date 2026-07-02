import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUIStore } from '@/store/useUIStore';

export const BackButton = ({ color = "white" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toggleCheck } = useUIStore();
 
    const handleBack = () => {
        if (location.pathname === '/signup') toggleCheck();
        navigate(-1);
    }

    return (
        <button 
            onClick={handleBack} 
            className="border-0 cursor-pointer bg-transparent flex items-center absolute left-3"
            style={{ color }}
        >
            <FaArrowLeft fontSize={25} />
        </button>
    );
};