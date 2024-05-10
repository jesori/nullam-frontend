import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import { EventParticipants } from '../composents/EventParticipants'
import { FormData, ParticipantFrom } from '../composents/ParticipantFrom'
import { IBusinessParticipant } from '../domain/IBusinessParticipant'
import { IPrivateParticipant } from '../domain/IPrivateParticipant'
import { AddExistingParticipant } from '../composents/AddExistingParticipant'
import { PageHeader } from '../composents/PageHeader'
import { addBusinessParticipantToEvent, addPrivateParticipantToEvent, getEventById } from '../services/EventService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addPPart } from '../services/PrivatePartisipantService'
import { addBPart } from '../services/BusinessPartisipantService'
import { Button, ToggleButtonGroup } from '@mui/joy'
import { useState } from 'react'

export const EventView = () => {
    const { id } = useParams<{ id: string }>()
    const [value, setValue] = useState<string | null>('new');
    const queryClient = useQueryClient();
    const { data: event} = useQuery({queryFn: () => getEventById(id || ''), queryKey:  [`event/${id}`]})
    const privateMutation = useMutation({mutationFn: addPPart });
    const addPrivateToEnetMuatation = useMutation({mutationFn: ({eventId, participantId}: {eventId: string, participantId: string}) =>  addPrivateParticipantToEvent(eventId, participantId)})
    const addBusinessToEnetMuatation = useMutation({mutationFn: ({eventId, participantId}: {eventId: string, participantId: string}) => addBusinessParticipantToEvent(eventId, participantId)})
    const businessMutation = useMutation({ mutationFn: addBPart })

    const addParticipant = async (data: FormData) => {
        if (id) {
            if (data.type === 'private') {
                const privateData: IPrivateParticipant = {
                    id: id,
                    ...data,
                }
                await privateMutation.mutateAsync(privateData, {onSuccess: async (partId: string) => {
                    await addPrivateToEnetMuatation.mutateAsync({eventId:id, participantId: partId}, {onSuccess: () =>{
                        queryClient.invalidateQueries({queryKey: [`eventparticipants`, id]});
                    }});
                }});
            }
            if (data.type === 'business') {
                const businessData: IBusinessParticipant = {
                    id: id,
                    name: data.firstName,
                    idNumber: data.idNumber,
                    participantsNumber: data.participantsNumber,
                    paymentMethod: data.paymentMethod
                }
                await businessMutation.mutateAsync(businessData, {onSuccess: async (partId: string) => {
                    await addBusinessToEnetMuatation.mutateAsync({eventId:id, participantId: partId}, {onSuccess: () =>{
                        queryClient.invalidateQueries({queryKey: [`eventparticipants`, id]});
                    }});
                }});
            }
        }
    }
    return (
        <div className='flex flex-col h-full'>
            <PageHeader content='Osavõtjad'/>
            <div className='flex flex-col w-full bg-white h-full py-3'>
                <div className='flex flex-col w-[35rem] self-center h-fit overflow-visible'>
                    <p className='text-2xl self-start text-[#005aa1] mt-3'>Osavõtjad</p>
                    {event != null &&
                        <div className='mt-5 w-full grid gap-1 grid-cols-3 h-fit self-center text-start'>
                            <p>Urituse nimi:</p>
                            <div className='col-span-2 ml-10'>{event.name}</div>
                            <p>Toimumisaeg:</p>
                            <div className='col-span-2 ml-10'>{moment(event.date).format('DD.MM.yyyy hh:mm').toString()}</div>
                            <p>Koht:</p>
                            <div className='col-span-2 ml-10'>{event.location}</div>
                            <p>Lisainfo:</p>
                            <div className='col-span-2 ml-10 max-h-[10rem] overflow-y-auto'>{event?.info}</div>
                            <p>Osavotjad:</p>
                            <div className='col-span-2 ml-10 max-h-[7rem]'>
                                {event.id &&
                                    <EventParticipants canRemove={moment(event?.date).isAfter(Date.now())} id={event.id} />
                                }
                            </div>
                        </div>
                    }
                </div>
                {moment(event?.date).isAfter(Date.now()) ?
                    <div className=' self-center h-fit w-[35rem] flex flex-col mt-7'>
                        <div className='flex flex-row'>

                            <p className='text-2xl text-start self-start grow text-[#005aa1] w-fit mt-5'>Osavõtja nimi</p>
                            <div className='self-center'>

                                <ToggleButtonGroup
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}>
                                    <Button className='w-fit p-0' value="new">Uus</Button>
                                    <Button className='w-fit' value="existing">Olemasolev</Button>
                                </ToggleButtonGroup>
                            </div>
                        </div>

                        <div className='self-end align-bottom w-full'>
                            {value === 'new' ?
                                <ParticipantFrom eventId={id} onSubmit={addParticipant} />
                                :
                                <div className='b mb-10'>
                                <AddExistingParticipant eventId={id} />
                                </div>
                            }
                        </div>
                    </div>
                    :
                    <div className='w-[35rem] self-center flex'>
                        <Link className='self-start mt-4' to={'/'}>
                            <Button color="neutral" size='sm' className='bg-[#e1e1e1] px-3'>Tagasi</Button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}
