"use client";

interface HeadigProps {
   title: string;
   subtitle?: string;
   center?: boolean;
}

const Heading: React.FC<HeadigProps> = ({ title, subtitle, center }) => {
   return (
      <div className={center ? "text-center" : "text-start"}>
         <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text dark:text-white mb-2 sm:mb-3">{title}</div>
         {subtitle && (
            <div className="font-medium text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg">{subtitle}</div>
         )}
      </div>
   );
};
export default Heading;
