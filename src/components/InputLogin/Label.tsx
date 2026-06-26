import clsx from "clsx"

interface LabelProps {
    inputId: string;
    active: boolean;
    icon?: React.ReactNode;
    hasError?: boolean;
    label: string;
    required?: boolean;
}
export const Label: React.FC<LabelProps> = ({ inputId, active, icon, hasError, label, required }) => {
    return (
        <label
            htmlFor={inputId}
            className={clsx(
                "absolute pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-left",
                !active &&
                clsx(
                    "top-1/2 -translate-y-1/2",
                    icon ? "left-12" : "left-5",
                    "text-base text-slate-500"
                ),
                active &&
                clsx(
                    "top-0 -translate-y-1/2",
                    "text-[11px] font-semibold text-slate-500",
                    "bg-white px-2 rounded-lg",
                    "border",
                    "shadow-[0_1px_4px_rgba(0,0,0,0.06)]",
                    icon ? "left-4" : "left-3",
                    hasError ? "border-red-300 text-red-600" : "border-primary-200",
                )
            )}
        >
            {label}
            {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
    )
}