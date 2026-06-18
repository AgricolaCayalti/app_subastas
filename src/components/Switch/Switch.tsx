import clsx from "clsx";
import React from "react";

interface SwitchProps {
    name?: string;                // made optional if you don't always need it
    required?: boolean;
    options?: string[];           // now accepts any string array
    value?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({
    name,
    required = false,
    options = ["SÍ", "NO"],
    value = undefined,
    onChange,
}: SwitchProps) => {
    const trueLabel = options[0] ?? "SÍ";
    const falseLabel = options[1] ?? "NO";
    const displayLabel = value !== undefined ? (value ? trueLabel : falseLabel) : null;

    return (
        <div className="flex justify-center items-center gap-5 text-[var(--primary)]">
            {displayLabel && <b>{displayLabel}</b>}
            <label className={clsx("relative inline-block", "w-16 h-8", "sm:w-20 sm:h-10")}>
                <input
                    name={name}
                    required={required}
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className="peer opacity-0 w-0 h-0"
                />
                <span
                    className={clsx(
                        "absolute",
                        "cursor-pointer",
                        "top-0",
                        "left-0",
                        "right-0",
                        "bottom-0",
                        "bg-gray-300",
                        "transition-colors",
                        "duration-[400ms]",
                        "rounded-full",
                        "peer-checked:bg-[var(--secondary)]",
                        "peer-focus:shadow-[0_0_1px_var(--secondary)]",
                        "before:absolute",
                        "before:content-['']",
                        "before:w-[26px]",
                        "before:h-[26px]",
                        "before:left-[10px]",
                        "before:bottom-[3px]",
                        "before:bg-white",
                        "before:transition-transform",
                        "before:duration-[400ms]",
                        "before:rounded-full",
                        "peer-checked:before:translate-x-[21px]",
                        "sm:before:w-[33px]",
                        "sm:before:h-[33px]",
                        "sm:before:left-3",
                        "sm:before:bottom-1",
                        "sm:peer-checked:before:translate-x-[26px]"
                    )}
                />
            </label>
        </div>
    );
};