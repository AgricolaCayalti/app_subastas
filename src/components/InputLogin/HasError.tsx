import { FaExclamationCircle } from "react-icons/fa";

interface HasErrorProps {
    errorMessage: string
}

export const HasError : React.FC<HasErrorProps> = ({ errorMessage }) => {
    return (
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 transition-all duration-200">
            <FaExclamationCircle className="flex-shrink-0" size={20} />
            <span>{errorMessage}</span>
        </div>
    )
}