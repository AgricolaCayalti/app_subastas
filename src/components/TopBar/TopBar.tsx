import { BackButton } from "../BackButton/BackButton";
import { ReactNode } from "react";

interface TopBarProps {
    title: string;
    bgColor?: string;
    ftColor?: string;
    shouldShowBackBtn?: boolean;
    rightSlot?: ReactNode;
    className?: string;
}

export const TopBar = ({
    title,
    bgColor = "primary",
    ftColor = "white",
    shouldShowBackBtn = false,
    rightSlot,
    className = "",
}: TopBarProps) => {
    return (
        <header
            className={`
                bg-[var(--${bgColor})]
                fixed top-0 left-0 w-full z-50
                h-14 sm:h-16 md:h-[72px]
                grid grid-cols-3 items-center
                px-4 sm:px-6
                border-b 
                shadow-[0_2px_8px_rgba(0,0,0,0.1)]     
                
                
                ${className}
            `}
        >
            {/* Columna izquierda: BackButton o espacio vacío */}
            <div className="flex items-center justify-start">
                {shouldShowBackBtn && (
                    <BackButton color={ftColor} aria-label="Volver atrás" />
                )}
            </div>
{/*   */}
            {/* Columna central: Título centrado */}
            <h3 className="
                            text-base sm:text-lg md:text-xl
                            font-semibold tracking-wide leading-tight
                            text-center
                            line-clamp-2    
                            break-words
                            px-2
                    ">
                {/* {title} */} {bgColor}
            </h3>

            {/* Columna derecha: slot opcional */}
            <div className="flex items-center justify-end">
                {rightSlot}
            </div>
        </header>
    );
};