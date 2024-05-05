import React, { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
type Props = {
    children: ReactNode
}
export const Layout:React.FC<Props> = ({ children }) => {
    return (
        <div className='flex flex-col justify-center w-[65rem] h-screen'>
            <Header />
            <main className='w-full h-full'>
                {children}
            </main>
            <Footer />
        </div>
    )
}
