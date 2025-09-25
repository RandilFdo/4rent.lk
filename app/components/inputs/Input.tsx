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
}) => {
   return (
      <div className="w-full">
         <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
         </label>
         <div className="relative">
            {formatPrice && <BiDollar size={24} className="text-neutral-700 absolute top-4 left-3" />}
            <input
               id={id}
               disabled={disabled}
               placeholder={placeholder}
               type={type}
               required={required}
               {...(register && id ? register(id, { required }) : { value, onChange })}
               className={`w-full p-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
                  formatPrice ? "pl-9" : "pl-4"
               } ${errors && errors[id!] ? "border-rose-500" : "border-neutral-300"} focus:border-neutral-800`}
            />
         </div>
      </div>
   );
};
export default Input;
