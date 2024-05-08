import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAllEvents } from '../services/EventService'

type Props = {
    className?: string
}

export const PastEvents: React.FC<Props> = ({ className }) => {
    const {data: events} = useQuery({queryFn: getAllEvents, queryKey: ['events']})

    return (
        <div className={`${className} flex flex-col`}>
            <div className='bg-[#005aa1] h-[5rem] flex justify-center'>
                <p className='self-center text-xl font-medium text-white'>
                    Toimunud uritused
                </p>
            </div>
            <div className='bg-white h-full '>
                {events?.filter(e => moment(Date.now()).isAfter(e.date)).map((event, index) => (
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
