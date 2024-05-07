import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { IEvent } from '../domain/IEvent';
import { Link, useNavigate } from 'react-router-dom';
import { useServiceContext } from '../context/ServiceContext';
import { Button, Input, Textarea } from '@mui/joy';
import Datepicker from 'react-tailwindcss-datepicker';
import { PageHeader } from '../composents/PageHeader';

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
            <PageHeader content='Ürituse lisamine'></PageHeader>
            <div className='bg-white flex justify-center h-full p-3'>
                <div className='flex flex-col w-[20rem] h-fit'>
                    <p className='text-2xl self-start text-[#005aa1] mt-5'>Urituse lisamine</p>
                    <div className="mt-5 w-full grid gap-3 grid-cols-3 h-fit self-center text-start">
                        <p>Urituse nimi:</p>
                        <Input
                            className='border h-7 col-span-2'
                            name="isGoing"
                            type=''
                            onChange={(e) => setName(e.target.value)} />
                        <p>Toimumisaeg:</p>
                        <div className='w-full col-span-2'>
                            <ReactDatePicker className='border h-7'
                                selected={eventDate}
                                minDate={new Date}
                                dateFormat="dd.MM.yyyy hh:mm"
                                showTimeSelect
                                onChange={(date) => setEventDate(date)}></ReactDatePicker>
                        </div>
                        <p>Koht:</p>
                        <Input
                            className='border h-7 col-span-2'
                            name="isGoing"
                            type=''
                            onChange={(e) => setLocation(e.target.value)} />
                        <p>Lisainfo:</p>
                        <Textarea 
                            minRows={2}
                            className='border w-full col-span-2 h-[4rem] text-start'
                            name="isGoing"
                            onChange={(e) => setInfo(e.target.value)} />
                        <div className='flex flex-row space-x-4 mt-5'>
                            <Link to={'/'}>
                                <Button  color="neutral" size='sm' className='bg-[#e1e1e1] px-3'>Tagasi</Button>
                            </Link>
                            <Button size='sm' className='bg-[#005aa1] text-white px-3' onClick={() => addEvent()}>Lisa</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
