"use client";

import { IconType } from "react-icons";

interface ButtonProps {
   label: string;
<<<<<<< HEAD
   onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
=======
   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
>>>>>>> 3c562109e0e46019af7fc625ace1fdb6a448871b
   disabled?: boolean;
   outline?: boolean;
   small?: boolean;
   icon?: IconType;
   className?: string;
   fullWidth?: boolean;
   type?: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonProps> = ({
   label,
   onClick,
   disabled,
   outline,
   small,
   icon: Icon,
   className = "",
   fullWidth = true,
   type = "button",
}) => {
   return (
      <button
         type={type}
         onClick={onClick}
         disabled={disabled}
         className={`
    relative
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-lg sm:rounded-xl
    font-semibold
    overflow-hidden
    group
    w-full
    ${outline 
      ? "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 hover:shadow-lg" 
      : "btn-gradient text-white border-0 shadow-lg hover:shadow-xl"
    }
    ${small ? "py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm" : "py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-md"}
    ${fullWidth ? "w-full" : ""}
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
