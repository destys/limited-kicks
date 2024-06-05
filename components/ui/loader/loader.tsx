import React from 'react'
import { PacmanLoader } from 'react-spinners'

interface LoaderProps {
    color?: string;
    size?: number;
}

const Loader: React.FC<LoaderProps> = ({ color, size }) => {
    return (
        <div className='absolute top-0 left-0 z-50 w-full h-full bg-white flex justify-center items-center'>
            <PacmanLoader color={color || "#2972FF"} size={size || 36} />
        </div>
    )
}

export default Loader