import React from 'react'
import { PacmanLoader } from 'react-spinners'

type Props = {}

const Loader = (props: Props) => {
    return (
        <div className='absolute w-full h-full bg-white flex justify-center items-center'>
            <PacmanLoader color="#2972FF" size={36} />
        </div>
    )
}

export default Loader