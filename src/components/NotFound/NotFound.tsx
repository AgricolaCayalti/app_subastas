import { FaListAlt } from 'react-icons/fa';

interface NotFoundProps {
    title?: string;
}

export const NotFound = ({ title = 'Sin Datos' }: NotFoundProps) => {
    return (
        <div className="flex items-center justify-center opacity-60 gap-2 h-[350px] ">
            <FaListAlt size={30} />
            <span className="text-back">{title}</span>
        </div>
    );
};