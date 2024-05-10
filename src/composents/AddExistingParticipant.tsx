import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Option, Select } from '@mui/joy'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllparticipants } from '../services/ParticipantService'
import { addBusinessParticipantToEvent, addPrivateParticipantToEvent } from '../services/EventService'

type AddExistingParticipantProps = {
    eventId?: string
}
export const AddExistingParticipant:React.FC<AddExistingParticipantProps> = ({ eventId }) => {
    const [selected, setSelected] = useState<number>(0)
    const queryClient = useQueryClient();
    const {data: participants} = useQuery({queryFn: getAllparticipants, queryKey: ['participants']})
    const addPrivateMuatation = useMutation({mutationFn: ({eventId, participantId}: {eventId: string, participantId: string}) =>  addPrivateParticipantToEvent(eventId, participantId)})
    const addBusinessMuatation = useMutation({mutationFn: ({eventId, participantId}: {eventId: string, participantId: string}) =>  addBusinessParticipantToEvent(eventId, participantId)})

    const addSelectedToEvent = async () => {
        if (participants && eventId) {
            const participant = participants[selected]
            if (participant.type === 'private' && participant.id) {
                await addPrivateMuatation.mutateAsync({eventId: eventId, participantId: participant.id}, {onSuccess: () =>{
                    queryClient.invalidateQueries({queryKey: [`eventparticipants`, eventId]});
                }})
            } else if (participant.type === 'business' && participant.id) {
                await addBusinessMuatation.mutateAsync({eventId: eventId, participantId: participant.id}, {onSuccess: () =>{
                    queryClient.invalidateQueries({queryKey: [`eventparticipants`, eventId]});
                }})
            }
        }
    }

    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: number | null,
    ) => {
        if (newValue) {
            setSelected(newValue)
        }
    };
    return (
        <div className='w-[35rem] h-full flex flex-col gap-4 pt-7'>
            <Select className='w-[20rem] self-center align-top' defaultValue={0} onChange={handleChange}>
                {participants?.map((p, index) => (
                    <Option key={index} value={index}>
                        {`${p.name} ${p.idNumber}`}
                    </Option>
                ))}
            </Select>
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
