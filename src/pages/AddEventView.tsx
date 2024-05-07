import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { EventService } from '../services/EventService';
import { IEvent } from '../domain/IEvent';
import { Link, useNavigate } from 'react-router-dom';
import { useServiceContext } from '../context/ServiceContext';

export const AddEventView = () => {
    const navigate  = useNavigate()
    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [eventDate, setEventDate] = useState<Date | null>(new Date);
    const [info, setInfo] = useState<string>('');
    const { services } = useServiceContext();
    useEffect(() => {
        console.log(name);

    }, [name]);

    const addEvent = async () =>{
        if (name.length > 0 && eventDate && location?.length > 0) {
            const event: IEvent = {
                name: name,
                location: location,
                date: eventDate,
                info: info
            }
            const res = await services.eventServeice.add(event)
            if (res) {
                navigate('/')
            }

        }
    }
    return (
        <div className='h-full flex flex-col'>
            <div className='bg-[#005aa1] h-[70px] flex justify-center'>
                <p className='self-center font-medium text-white'>
                    Urituse lisamine
                </p>
            </div>
            <div className='bg-white flex justify-center h-full p-3'>
                <div className='flex flex-col w-[350px] h-fit'>
                    <p className='text-2xl self-start text-[#005aa1] mt-5'>Urituse lisamine</p>
                    <div className="mt-5 w-full grid gap-3 grid-cols-3 h-fit self-center text-start">
                        <p>Urituse nimi:</p>
                        <input
                            className='border h-7 col-span-2'
                            name="isGoing"
                            type=''
                            onChange={(e) => setName(e.target.value)} />
                        <p>Toimumisaeg:</p>
                        <div className='w-full col-span-2'>
                            <ReactDatePicker className='border h-7 w-[230px]'
                                selected={eventDate}
                                minDate={new Date}
                                dateFormat="dd.MM.yyyy hh:mm"
                                showTimeSelect
                                onChange={(date) => setEventDate(date)}></ReactDatePicker>
                        </div>
                        <p>Koht:</p>
                        <input
                            className='border h-7 col-span-2'
                            name="isGoing"
                            type=''
                            onChange={(e) => setLocation(e.target.value)} />
                        <p>Lisainfo:</p>
                        <textarea
                            maxLength={5000}
                            className='border w-full col-span-2 h-[50px] text-start'
                            name="isGoing"
                            onChange={(e) => setInfo(e.target.value)} />
                        <div className='flex flex-row space-x-4 mt-5'>
                            <Link to={'/'}>
                                <button className='bg-[#e1e1e1] px-3'>Tagasi</button>
                            </Link>
                            <button className='bg-[#005aa1] text-white px-3' onClick={() => addEvent()}>Lisa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
