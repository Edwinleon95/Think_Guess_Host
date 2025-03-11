import { FC, ReactNode } from 'react';

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    children: ReactNode;
}

const CreateButton: FC<ButtonProps> = ({ onClick, disabled, loading, className, children }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`px-8 py-4 text-xl font-semibold rounded-xl shadow-md transition-all duration-300 ease-in-out transform 
                ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 active:scale-95'} 
                ${loading ? 'opacity-70' : ''} 
                text-white focus:outline-none focus:ring-4 focus:ring-red-300 ${className}`}
        >
            {loading ? (
                <div className="flex items-center justify-center space-x-2">
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                    </svg>
                    <span>{children}</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
};

export default CreateButton;