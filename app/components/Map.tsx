"use client";

import dynamic from "next/dynamic";
import { MapProps } from "./MapProps";

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import("./MapComponent"), {
   ssr: false,
   loading: () => (
      <div className="h-[35vh] rounded-lg bg-gray-200 flex items-center justify-center">
         <p className="text-gray-500">Loading map...</p>
      </div>
   ),
});

const Map: React.FC<MapProps> = (props) => {
   return <MapComponent {...props} />;
};

export default Map;
