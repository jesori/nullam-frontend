import React, { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
type Props = {
    children: ReactNode
}
export const Layout:React.FC<Props> = ({ children }) => {
    return (
        <div className='flex flex-col w-full h-full'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}
