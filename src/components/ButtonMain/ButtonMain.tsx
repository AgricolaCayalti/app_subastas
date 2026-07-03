interface ButtonMainProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;  // optional
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    bgColor?: string;
    ftColor?: string;
    fontSize?: string | number;
    className?: string;
}

export const ButtonMain = ({
    children,
    onClick,
    type = 'button',
    disabled = false,
    bgColor = 'primary',
    ftColor = 'white',
    fontSize = undefined,
    className = '',
}: ButtonMainProps ) => {
    return (
        <button
            type={type}
            className={`
                block mx-8
                h-14 px-4 rounded-md border-0
                shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]
                cursor-pointer uppercase font-medium leading-none
                transition-opacity duration-200
                hover:opacity-90 active:opacity-90
                disabled:border disabled:border-gray-400
                disabled:bg-gray-300 disabled:text-gray-600
                disabled:shadow-none disabled:opacity-100
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                ${className}
            `}
            style={{
                fontSize,
                color: `var(--${ftColor})`,
                backgroundColor: `var(--${bgColor})`,
            }}
            disabled={disabled}
            onClick={onClick}
        >
            {children} 
        </button>
    );
};