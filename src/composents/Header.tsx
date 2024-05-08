import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'
import logo2 from '../assets/symbol.svg'

export const Header = () => {
    const location = useLocation();

    return (
        <div className='w-full h-[4rem] bg-white my-3 flex flex-row pl-5 pr-5'>
            <img className='m-3' src={logo} alt="" />
            <div className='grow flex ml-[5rem]'>

                <Link className={`self-center w-[5rem] h-full flex justify-center  ${location.pathname === '/'
                    ? 'bg-[#005aa1] text-white' :
                    'hover:bg-[#005aa1] hover:text-white'}`} to='/'>
                    <p className='align-middle self-center text-xs font-semibold'>
                        AVALEHT
                    </p>
                </Link>
                <Link className={`self-center w-[8rem] h-full px-1 flex justify-center text-center ${location.pathname === '/addevent'
                    ? 'bg-[#005aa1] text-white' :
                    'hover:bg-[#005aa1] hover:text-white'}`} to='/addevent'>
                    <p className='align-middle self-center text-xs font-semibold'>
                        ÜRITUSE LISAMINE
                    </p>
                </Link>
            </div>
            <img className='m-2' src={logo2} alt="" />
        </div>
    )
}
