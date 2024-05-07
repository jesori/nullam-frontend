import { useEffect } from 'react';
import image from '../assets/pilt.jpg'
import { OngoingEvents } from '../composents/OngoingEvents';
import { PastEvents } from '../composents/PastEvents';
import { useServiceContext } from '../context/ServiceContext';
export const HomeView = () => {
    const { services: {
        eventServeice
    } } = useServiceContext()
    useEffect(() => {
        const getData =  async () => {
            const events = await eventServeice.getAll()
            console.log(events);

        }
        getData()
        
        
    }, []);
    return (
        <div className='h-full w-full flex flex-col'>
            <div className='bg-[#005aa0] w-full h-[15rem] flex flex-row'>
                {/* <div className="basis-1/2 h-full  text-white font-light text-center text-xl self-center align-middle">
                    asd
                </div> */}
                <div className='self-center mx-7 '>

                <p className="basis-1/2 w-full h-full text-wrap text-left text-white font-light  text-xl self-center align-middle">
                    Sed nec elit vestibulum,
                    <span className='font-semibold'> tincidunt orci </span>
                    et, sagittis ex. Vestibulum
                    rutrum 
                    <span className='font-semibold'> neque suscipit </span>
                    ante mattis maximus. Nulla non sapien
                    <span className='font-semibold'> viverra, lobortis lorem non</span>
                    , accumsan metus.
                </p>
                </div>

                <img className='basis-1/2  h-full' src={image} alt="" />
            </div>
            <div className='flex flex-row w-full h-full'>
                <OngoingEvents className='basis-1/2 m-5'/>
                <PastEvents className='basis-1/2 m-5'/>
            </div>
        </div>
    )
}
