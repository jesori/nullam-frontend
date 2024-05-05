import { useEffect } from 'react';
import image from '../assets/pilt.jpg'
import { EventService } from '../services/EventService';
export const Home = () => {
    useEffect(() => {
        const service = new EventService()
        const a = service.getAll()
        
    }, []);
    return (
        <div className='h-full w-full'>
            <div className='bg-[#005aa0] h-[250px] w-full flex flex-row'>
                <p className="basis-1/2 text-white font-light text-center text-xl self-center align-middle">
                    Sed nec elit vestibulum,
                    <span className='font-semibold'>tincidunt orci</span>
                    et, sagittis ex. Vestibulum
                    rutrum <span className='font-semibold'> neque suscipit</span>
                    ante mattis maximus. Nulla non sapien
                    <span className='font-semibold'>viverra,lobortis lorem non</span>
                    , accumsan metus.
                </p>

                <img className='basis-1/2' src={image} alt="" />
            </div>
        </div>
    )
}
