import { useEffect } from 'react';
import clsx from "clsx";
import { BackButton } from "../BackButton/BackButton";
import { ReactNode } from "react";
import { useStatusBar } from '@/context/StatusBarContext';
import { isColorDark } from '@/utils/colorUtils';

interface TopBarProps {
    title: string;
    bgColor?: string;
    ftColor?: string;
    shouldShowBackBtn?: boolean;
    rightSlot?: ReactNode;
    className?: string;
    statusBarStyle?: 'dark' | 'light';
}

export const TopBar = ({
    title,
    bgColor = "primary",
    ftColor = "white",
    shouldShowBackBtn = false,
    rightSlot,
    className = "",
    statusBarStyle: forcedStyle,
}: TopBarProps) => {
    const { setStatusBarStyle } = useStatusBar();

    useEffect(() => {
        const applyStatusBarStyle = async () => {
            let style: 'dark' | 'light';
            if (forcedStyle) {
                style = forcedStyle;
            } else {
                const computedBg = getComputedStyle(document.documentElement)
                    .getPropertyValue(`--${bgColor}`).trim() || bgColor;
                style = isColorDark(computedBg) ? 'dark' : 'light';
            }
            await setStatusBarStyle(style);
        };
        applyStatusBarStyle();
    }, [bgColor, forcedStyle, setStatusBarStyle]);

    return (
        <header
            className={clsx(
                'fixed top-0 left-0 right-0 z-50', // <-- Asegura posición y z-index
                'h-25 sm:h-16 md:h-[72px]', // <-- Altura fija (3.5rem) para coincidir con el padding
                'flex items-center justify-between px-4',
                'shadow-[0_2px_8px_rgba(0,0,0,0.1)]',
                className
            )}
            style={{
                backgroundColor: `var(--${bgColor})`,
                paddingTop: 'env(safe-area-inset-top)', // <-- Añade padding superior para notch
            }}
        >
            {/* Left column */}
            <div className="flex items-center justify-start">
                {shouldShowBackBtn && (
                    <BackButton color={ftColor} aria-label="Volver atrás" />
                )}
            </div>

            {/* Title */}
            <h3 className={
                clsx(
                    `text-[var(--${ftColor})]`,
                    "text-xs sm:text-lg md:text-xl",
                    "font-semibold tracking-wide leading-tight",
                    "text-center",
                    "line-clamp-2",
                    "wrap-break-word",
                    "px-2"
                )}>
                {title}
            </h3>

            {/* Right slot */}
            <div className="flex items-center justify-end">
                {rightSlot}
            </div>
        </header>
    );
};