import React, { useEffect } from 'react'
import { useServiceContext } from '../context/ServiceContext'

type EventProps = {
    id:string
}
export const Event:React.FC<EventProps> = ({ id }) => {
    const { services: {
        eventServeice
    } } = useServiceContext()
    
    useEffect(() => {
        const getEvent = async () =>{
                const event = await eventServeice.getById(id)

                if (event) {
                    setEvent(event)
                }
        }
        getEvent()
    }, []);
  return (
    <div>Event</div>
  )
}
