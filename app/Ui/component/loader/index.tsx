import React from 'react';
import { ThreeDots } from 'react-loader-spinner';


export default function Loader({ color } : { color?: string}) {
  
    return (
        <div className="flex items-center justify-center">
            <ThreeDots color={"white"} height={16} />
        </div>
    );
}
