import React from 'react'

type Props = {
    className?: string
}

export const PastEvents: React.FC<Props> = ({ className }) => {
    return (
        <div className={`${className} flex flex-col`}>
            <div className='bg-[#005aa1] h-[70px] flex justify-center'>
                <p className='self-center text-xl font-medium text-white'>
                    Toimunud uritused
                </p>
            </div>
            <div>asd</div>
        </div>
    )
}
