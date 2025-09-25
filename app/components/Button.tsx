"use client";

import { IconType } from "react-icons";

interface ButtonProps {
   label: string;
   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
   disabled?: boolean;
   outline?: boolean;
   small?: boolean;
   icon?: IconType;
   className?: string;
}
const Button: React.FC<ButtonProps> = ({
   label,
   onClick,
   disabled,
   outline,
   small,
   icon: Icon,
   className = "",
}) => {
   return (
      <button
         onClick={onClick}
         disabled={disabled}
         className={`
    relative
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-xl
    font-semibold
    overflow-hidden
    group
    w-full
    ${outline 
      ? "bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 hover:shadow-lg" 
      : "btn-gradient text-white border-0 shadow-lg hover:shadow-xl"
    }
    ${small ? "py-2 px-4 text-sm" : "py-3 px-6 text-md"}
    ${className}
   `}
      >
         <span className="relative z-10 flex items-center justify-center gap-2">
            {label}
            {Icon && <Icon size={small ? 16 : 20} />}
         </span>
      </button>
   );
};
export default Button;
