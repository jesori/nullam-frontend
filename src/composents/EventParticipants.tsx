import React, {  } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getAllparticipantsForEvent } from '../services/ParticipantService'
import { removeBusinessParticipantFromEvent } from '../services/EventService'

type EventParticipantsProps = {
    id:string
    canRemove: boolean
}
export const EventParticipants:React.FC<EventParticipantsProps> = ({ id, canRemove }) => {
    const {data: participants, refetch} = useQuery({queryFn: () => getAllparticipantsForEvent(id), queryKey:  [`eventparticipants`, id]})
    const removeMutation = useMutation({mutationFn: removeBusinessParticipantFromEvent, onSuccess: () => refetch()})
    return (
        <div className='w-fit h-full overflow-y-auto'>
                    {participants != null && participants.map((p, index) => (
                        <div key={index} className='w-full mt-1 text-slate-500 text-start justify-items-start gap-1  grid grid-cols-[10px_12rem_7rem_auto_auto]'>
                            <p>{index + 1}.</p>
                            <p className='truncate max-w-[12rem]'>{p.name}
                            </p>
                            <p className='self-start text-start'>{p.idNumber}</p>
                            <Link to={{ pathname: `/participant/${p.id}`, search: `?type=${p.type}` }}>VAATA</Link>
                            {canRemove &&
                                <button onClick={() => { if (p.participantEventId) removeMutation.mutate(p.participantEventId) }}>
                                    KUSTUTA
                                </button>
                            }
                        </div>
                    ))}
        </div>
    )
}
