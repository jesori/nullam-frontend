import React from 'react'
import { getAllEvents } from '../services/EventService'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

type Props = {
    className?: string
}

export const OngoingEvents: React.FC<Props> = ({className}) => {
    const {data: events} = useQuery({queryFn: getAllEvents, queryKey: ['events']})
    console.log(events);
    

    return (
        <div className={`${className} flex flex-col`}>
        <div className='bg-[#005aa1] h-[5rem] flex justify-center'>
            <p className='self-center font-medium text-white'>
                Tulevased üritused
            </p>
            </div>
            <div className='bg-white h-full '>
                {events?.filter(e => moment(e.date).isAfter(Date.now())).map((event, index) => (
                    <div className='w-full px-5 mt-2 text-slate-500 text-start justify-items-start gap-3  grid grid-cols-[20px_1fr_auto_auto_auto]'>
                        <p>{index + 1}.</p>
                        <p>{event.name}</p>
                        <p>{moment(event.date).format('DD.MM.yyyy').toString()}</p>
                        <Link state={{id:event.id}} className='' to={`/event/${event.id}`}>osavõtjad</Link>
                        <p>X</p>
                    </div>
                ))}
            </div>
    </div>
  )
}
