import clsx from "clsx";
import React from "react";

interface IconProps {
    active: boolean;
    icon: React.ReactNode;
}

export const Icon: React.FC<IconProps> = ({ active, icon }) => {
    return (
        <div
            className={clsx(
                "absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-all duration-300",
                active ? "text-primary-600 scale-110" : "text-slate-400"
            )}
        >
            {icon}
        </div>
    );
}