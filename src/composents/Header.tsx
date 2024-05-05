import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div className='w-full h-[200px] bg-gray-100'>
            <Link to='/'>Home</Link>
            <Link to='/addEvent'>AddEvent</Link>
        </div>
    )
}
