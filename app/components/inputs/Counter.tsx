"use client";

import { useCallback } from "react";
import { AiOutlineMinus } from "@react-icons/all-files/ai/AiOutlineMinus";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";

interface CounterProps {
   title: string;
   subTitle: string;
   value: number;
   onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({ title, subTitle, value, onChange }) => {
   const onAdd = useCallback(() => onChange(value + 1), [onChange, value]);
   const onReduce = useCallback(() => {
      if (value === 1) {
         return;
      }
      onChange(value - 1);
   }, [onChange, value]);

   return (
      <div className="flex flex-row items-center justify-between">
         <div className="flex flex-col">
            <div className="font-medium text-gray-900 dark:text-white">{title}</div>
            <div className="font-light text-gray-600 dark:text-gray-300">{subTitle}</div>
         </div>
         <div className="flex flex-row items-center gap-4">
            <div
               onClick={onReduce}
               className="w-10 h-10 rounded-full border-[1px] border-neutral-400 dark:border-gray-600 flex items-center justify-center text-neutral-600 dark:text-gray-300 cursor-pointer hover:opacity-80 transition"
            >
               <AiOutlineMinus />
            </div>
            <div className="font-light text-xl text-neutral-600 dark:text-white">{value}</div>
            <div
               onClick={onAdd}
               className="w-10 h-10 rounded-full border-[1px] border-neutral-400 dark:border-gray-600 flex items-center justify-center text-neutral-600 dark:text-gray-300 cursor-pointer hover:opacity-80 transition"
            >
               <AiOutlinePlus />
            </div>
         </div>
      </div>
   );
};
export default Counter;
