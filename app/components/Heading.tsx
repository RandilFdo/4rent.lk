"use client";

interface HeadigProps {
   title: string;
   subtitle?: string;
   center?: boolean;
}

const Heading: React.FC<HeadigProps> = ({ title, subtitle, center }) => {
   return (
      <div className={center ? "text-center" : "text-start"}>
         <div className="text-3xl font-bold gradient-text mb-3">{title}</div>
         <div className="font-medium text-gray-600 text-lg">{subtitle}</div>
      </div>
   );
};
export default Heading;
