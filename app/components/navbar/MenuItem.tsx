"use client";

interface MenuItemProps {
   onClick: () => void;
   label: string;
   isSpecial?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, isSpecial = false }) => {
            if (isSpecial) {
               return (
                  <div onClick={onClick} className="px-4 py-3 bg-transparent text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition font-semibold border-2 border-transparent hover:border-blue-300 dark:hover:border-purple-400 rounded-lg">
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
