import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useServiceContext } from '../context/ServiceContext'
import { IEvent } from '../domain/IEvent'

type Props = {
    className?: string
}

export const PastEvents: React.FC<Props> = ({ className }) => {
    const { services: {
        eventServeice
    } } = useServiceContext()
    const [events, setEvents] = useState<IEvent[]>([])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await eventServeice.getAll();
                setEvents(data.filter(e => moment(Date.now()).isAfter(e.date)))
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, []);
    return (
        <div className={`${className} flex flex-col`}>
            <div className='bg-[#005aa1] h-[5rem] flex justify-center'>
                <p className='self-center text-xl font-medium text-white'>
                    Toimunud uritused
                </p>
            </div>
            <div className='bg-white h-full '>
                {events.map((event, index) => (
                    <div className='w-full px-5 mt-2 text-slate-500 text-start justify-items-start gap-3  grid grid-cols-[20px_1fr_auto_auto]'>
                        <p>{index + 1}.</p>
                        <p>{event.name}</p>
                        <p>{moment(event.date).format('DD.MM.yyyy').toString()}</p>
                        <Link state={{id:event.id}} className='' to={`/event/${event.id}`}>osavõtjad</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
