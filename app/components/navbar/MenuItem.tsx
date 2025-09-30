"use client";

interface MenuItemProps {
   onClick: () => void;
   label: string;
   isSpecial?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, isSpecial = false }) => {
   if (isSpecial) {
      return (
         <div onClick={onClick} className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition font-semibold">
            {label}
         </div>
      );
   }
   
   return (
      <div onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold text-gray-900 dark:text-white">
         {label}
      </div>
   );
};
export default MenuItem;
