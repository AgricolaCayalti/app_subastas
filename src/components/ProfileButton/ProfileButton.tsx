import { FaLockOpen, FaSignOutAlt } from 'react-icons/fa';
import { DialogChangePassword } from '../DialogChangePassword/DialogChangePassword';
import { useProfileButton } from './useProfileButton';

export const ProfileButton = () => {
    const {
        setDialogOpen,
        user,
        strings,
        onSignOut,
    } = useProfileButton();

    return (
        <div className="absolute bottom-[15px] left-0 w-full h-[155px] text-[var(--primary)] flex flex-col justify-between items-center pt-[10px] pb-[10px] text-center">
            <div className="flex text-[0.95em] gap-[2em]">
                <div
                    className="text-[var(--terciary)] flex flex-row gap-[0.5em] items-center justify-end font-light cursor-pointer"
                    onClick={() => setDialogOpen(true)}
                >
                    <FaLockOpen className="text-[18px]" />
                    {strings.COMMON_CAMBIAR_CLAVE}
                </div>
                <div
                    className="text-[var(--terciary)] flex flex-row gap-[0.5em] items-center justify-end font-light cursor-pointer"
                    onClick={() => onSignOut()}
                >
                    <FaSignOutAlt className="text-[18px]" />
                    {strings.COMMON_CERRAR_SESION}
                </div>
            </div>
            <div className="overflow-hidden text-ellipsis text-[var(--gray)] max-w-[90vw]">
                {user?.nombres || ''}
            </div>
            <DialogChangePassword />
        </div>
    );
};