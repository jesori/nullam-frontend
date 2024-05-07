import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div className='w-full h-[70px] bg-white my-5'>
            <Link to='/'>Home</Link>
            <Link to='/addevent'>AddEvent</Link>
        </div>
    )
}
