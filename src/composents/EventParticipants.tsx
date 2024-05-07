import React, { useEffect, useState } from 'react'
import { useServiceContext } from '../context/ServiceContext'
import { IPatricipant } from '../domain/IParticipant'
import { Link } from 'react-router-dom'

type EventParticipantsProps = {
    id:string
}
export const EventParticipants:React.FC<EventParticipantsProps> = ({ id }) => {
    const { services: {
        participantService,
        eventServeice
    } } = useServiceContext()
    const [participants, setParticipants] = useState<IPatricipant[]>()
    const getParticipants = async () => {
        const participants = await participantService.getAllForEvent(id)

        if (participants) {
            console.log(participants);
            
            setParticipants(participants)
        }
    }
    useEffect(() => {
        getParticipants()
    }, []);

    const removeParticipant = async (id?: string) => {
        if (id) {
            const res = await eventServeice.removeBusinessParticipantFromEvent(id)
            if (res < 300) {
                getParticipants()
            }
        }
    }
  return (
    <div className='w-[25rem] h-full'>
            {participants != null && participants.map((p, index) => (
                <div key={index} className='w-full mt-2 text-slate-500 text-start justify-items-start gap-3  grid grid-cols-[10px_1fr_auto_auto_auto]'>
                    <p>{index + 1}.</p>
                    <p>{p.name}</p>
                    <p className='self-start text-start'>{p.idNumber}</p>
                    <Link to={{pathname:`/participant/${p.id}`,search: `?type=${p.type}`}}>VAATA</Link>
                    <button onClick={() => removeParticipant(p.participantEventId)}>KUSTUTA</button>
                </div>
            ))}</div>
    )
}
