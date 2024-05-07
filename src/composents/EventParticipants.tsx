import React, { useEffect, useState } from 'react'
import { useServiceContext } from '../context/ServiceContext'
import { IPatricipant } from '../domain/IParticipant'
import { Link } from 'react-router-dom'

type EventParticipantsProps = {
    id:string
}
export const EventParticipants:React.FC<EventParticipantsProps> = ({ id }) => {
    const { services: {
        particiPantservice
    } } = useServiceContext()
    const [participants, setParticipants] = useState<IPatricipant[]>()
    const getEvent = async () => {
        const participants = await particiPantservice.getAllForEvent(id)

        if (participants) {
            console.log(participants);
            
            setParticipants(participants)
        }

        // if (privat) {
        //     console.log(private);
        // }
    }
    useEffect(() => {
        
        getEvent()
    }, []);

    const removeParticipant = () => {
        // particiPantservice.
    }
  return (
    <div className='w-[400px] h-full'>
            {participants != null && participants.map((p, index) => (
                <div key={index} className='w-full mt-2 text-slate-500 text-start justify-items-start gap-3  grid grid-cols-[10px_1fr_auto_auto_auto]'>
                    <p>{index + 1}.</p>
                    <p>{p.name}</p>
                    <p className='self-start text-start'>{p.idNumber}</p>
                    <Link to={{pathname:`/participant/${p.id}`,search: `?type=${p.type}`}}>VAATA</Link>
                    <button>KUSTUTA</button>
                </div>
            ))}</div>
    )
}
