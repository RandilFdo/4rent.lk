"use client";

interface MenuItemProps {
   onClick: () => void;
   label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
   return (
      <div onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold text-gray-900 dark:text-white">
         {label}
      </div>
   );
};
export default MenuItem;
