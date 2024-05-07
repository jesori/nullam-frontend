import React from 'react'
import image from '../assets/libled.jpg'


type PageHeaderProps = {
    content: string
}
export const PageHeader: React.FC<PageHeaderProps> = ({ content }) => {
    return (
        <div className='bg-[#005aa1] h-[5rem] flex felx-row '>
            <p className='basis-1/3 self-center pl-6 text-start text-2xl font-thin text-white'>
                {content}
            </p>
            <div className='h-fill w-full grow relative overflow-hidden'>

                <img className='absolute' src={image} alt="" />
            </div>
        </div>
    )
}
