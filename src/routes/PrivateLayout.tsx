// components/PrivateLayout.tsx
import { Outlet } from 'react-router-dom';
import { useSession } from '@/routes/useUserSession';

export const PrivateLayout = () => {
    useSession(); 
    return <Outlet />;
};