import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useServiceContext } from '../context/ServiceContext'
import { IEvent } from '../domain/IEvent'
import moment from 'moment'
import { EventParticipants } from '../composents/EventParticipants'
import { FormData, ParticipantFrom } from '../composents/ParticipantFrom'
import { IBusinessParticipant } from '../domain/IBusinessParticipant'
import { IPrivateParticipant } from '../domain/IPrivateParticipant'

export const EventView = () => {
    const { id } = useParams()
    const {services} = useServiceContext()
    const [event, setEvent] = useState<IEvent>()

    useEffect(() => {
        const getEvent = async () =>{
            if (id) {
                const event = await services.eventServeice.getById(id)

                if (event) {
                    setEvent(event)
                }
            }
        }
        getEvent()
    }, []);

    const addParticipant = async (data: FormData) => {
        if (id) {
            if (data.type === 'private') {
                const privateData: IPrivateParticipant = {
                    id: id,
                    ...data,
                }
                const res = await services.eventServeice.addPrivateParticipantToEvent(id, privateData);
                if (res < 300) {
                    navigate('/')
                }
            }
            if (data.type === 'business') {
                const businessData: IBusinessParticipant = {
                    id: id,
                    name: data.firstName,
                    idNumber: data.idNumber,
                    participantsNumber: data.participantsNumber,
                    paymentMethod: data.paymentMethod
                }
                const res = await services.businessParticipantService.put(id, businessData);
                if (res < 300) {
                    navigate('/')
                }
            }
        }
    }
    return (
        <div className='flex flex-col h-full'>
            <div className='bg-[#005aa1] h-[70px] flex justify-center'>
                <p className='self-center font-medium text-white'>
                    Osavotjad
                </p>
            </div>
            <div className='flex flex-col  w-full bg-white h-full py-3'>
                <div className='flex flex-col bg-green-200 w-[350px] self-center h-fit'>

                    <p className='text-2xl self-start text-[#005aa1] mt-3'>Osavotjad</p>
                    {event != null &&
                        <div className='mt-5 w-full grid gap-3 grid-cols-3 h-fit self-center text-start'>
                            <p>Urituse nimi:</p>
                            <div className='col-span-2 ml-10'>{event.name}</div>
                            <p>Toimumisaeg:</p>
                            <div className='col-span-2 ml-10'>{moment(event.date).format('DD.MM.yyyy hh:mm').toString()}</div>
                            <p>Koht:</p>
                            <div className='col-span-2 ml-10'>{event.location}</div>
                            <p>Osavotjad:</p>
                            <div className='col-span-2 ml-10'>
                                {event.id &&
                                    <EventParticipants id={event.id} />
                                }
                            </div>
                        </div>
                    }
                </div>
                <div className=' self-center h-full flex bg-orange-200'>
                    <div className='self-end h-fit bg-blue-100'>
                    <ParticipantFrom eventId={id} onSubmit={addParticipant}/>
                    </div>
                </div>
            </div>
        </div>
    )
}