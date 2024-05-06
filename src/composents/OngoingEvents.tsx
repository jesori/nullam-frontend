import React, { useEffect, useState } from 'react'
import { IEvent } from '../domain/IEvent'
import { EventService } from '../services/EventService'

type Props = {
    className?: string
}

export const OngoingEvents: React.FC<Props> = ({className}) => {
    const [events, setEvents] = useState<IEvent[]>([])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await EventService.getAll();
                setEvents(data)
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, []);

    return (
        <div className={`${className} flex flex-col`}>
        <div className='bg-[#005aa1] h-[70px] flex justify-center'>
            <p className='self-center font-medium text-white'>
                Tulevased uritused
            </p>
        </div>
        <div className='bg-white h-full'>
            {events.map((event, index) => (
                <div key={index} className="p-2">
                <p>{index + 1}. {event.name}</p>
            </div>
            ))}
        </div>
    </div>
  )
}
