"use client";
import { BiDollar } from "@react-icons/all-files/bi/BiDollar";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FieldValues } from "react-hook-form";

interface InputProps {
   id?: string;
   label: string;
   type?: string;
   disabled?: boolean;
   formatPrice?: boolean;
   required?: boolean;
   value?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   placeholder?: string;
   register?: UseFormRegister<FieldValues>;
   errors?: FieldErrors<FieldValues>;
   min?: string;
}
const Input: React.FC<InputProps> = ({
   id,
   label,
   type = "text",
   disabled,
   formatPrice,
   required,
   value,
   onChange,
   placeholder,
   register,
   errors,
   min,
}) => {
   return (
      <div className="w-full">
         <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            {label}
         </label>
         <div className="relative">
            {formatPrice && <BiDollar size={20} className="text-neutral-700 dark:text-gray-300 absolute top-3 sm:top-4 left-2 sm:left-3" />}
            <input
               id={id}
               disabled={disabled}
               placeholder={placeholder}
               type={type}
               required={required}
               min={min}
               {...(register && id ? register(id, { required }) : { value, onChange })}
               className={`w-full p-3 sm:p-4 font-light bg-white dark:bg-gray-700 border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base text-gray-900 dark:text-white ${
                  formatPrice ? "pl-7 sm:pl-9" : "pl-3 sm:pl-4"
               } ${errors && errors[id!] ? "border-rose-500" : "border-neutral-300 dark:border-gray-600"} focus:border-neutral-800 dark:focus:border-gray-400`}
            />
         </div>
      </div>
   );
};
export default Input;
