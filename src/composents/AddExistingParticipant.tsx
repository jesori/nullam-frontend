import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useServiceContext } from '../context/ServiceContext'
import { IPatricipant } from '../domain/IParticipant'
import { Button } from '@mui/joy'

type AddExistingParticipantProps = {
    eventId?: string
}
export const AddExistingParticipant:React.FC<AddExistingParticipantProps> = ({ eventId }) => {
    const { services: {
        participantService,
        eventServeice
    } } = useServiceContext()

    const [participants, setParticipants] = useState<IPatricipant[]>()
    const [selected, setSelected] = useState<number>()

    const getParticipants = async () => {
        const participants = await participantService.getAll()
        if (participants) {
            setParticipants(participants)
        }
    }
    useEffect(() => {
        getParticipants()
    }, []);

    const addSelectedToEvent = async () => {
        if (selected && eventId && participants) {
            const participant = participants[selected]
            if (participants[selected].type === 'private' && participant.id) {
                await eventServeice.addPrivateParticipantToEvent(eventId, participant.id)
            } else if (participants[selected].type === 'business' && participant.id) {
                await eventServeice.addBusinessParticipantToEvent(eventId, participant.id)
            }
        }
    }
    return (
        <div className='w-[25rem] h-full flex flex-col gap-4'>
            <select className='w-[20rem]' onChange={e => setSelected(Number.parseInt(e.target.value))}>
                {participants?.map((p, index) => (
                    <option key={index} className='w-[20rem]' value={index}>
                        <div className='grid grid-cols-2 bg-orange-300'>
                            <p className='ml-10'>
                                {`${p.name} ${p.idNumber}`}
                            </p>
                        </div>
                    </option>
                ))}
            </select>
            <div className='flex flex-row space-x-4 mt-5'>
                <Link to={'/'}>
                    <Button color="neutral" size='sm' className='bg-[#e1e1e1] px-3'>Tagasi</Button>
                </Link>
                <Button size='sm' className='bg-[#005aa1] text-white px-3' onClick={() => addSelectedToEvent()}  >
                    <p>Lisa</p>
                </Button>
            </div>
        </div>
    )
}
