import React from 'react'
import { getAllEvents, removeEvent } from '../services/EventService'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import remove from '../assets/remove.svg'
import { Button } from '@mui/joy'

type Props = {
    className?: string
}

export const OngoingEvents: React.FC<Props> = ({ className }) => {
    const queryClient = useQueryClient();
    const {data: events} = useQuery({queryFn: getAllEvents, queryKey: ['events']})
    const removeMutation = useMutation({ mutationFn: (id: string) => removeEvent(id), onSuccess: () =>{
        queryClient.invalidateQueries({queryKey: [`events`]});
    }
    })
    
    return (
        <div className={`${className} flex flex-col`}>
        <div className='bg-[#005aa1] h-[5rem] flex justify-center'>
            <p className='self-center text-xl font-medium text-white'>
                Tulevased üritused
                </p>
            </div>
            <div className='bg-white h-full flex flex-col'>
                <div className='grow overflow-auto'>

                    {events?.filter(e => moment(e.date).isAfter(Date.now())).map((event, index) => (
                        <div className='w-full px-5 mt-2 text-slate-500 text-start justify-items-start gap-3  grid grid-cols-[20px_1fr_auto_auto_auto]'>
                            <p>{index + 1}.</p>
                            <p>{event.name}</p>
                            <p>{moment(event.date).format('DD.MM.yyyy').toString()}</p>
                            <Link state={{ id: event.id }} className='' to={`/event/${event.id}`}>osavõtjad</Link>
                            <button onClick={() => {if(event.id) removeMutation.mutate(event.id)}}>
                                <img className='h-[1.2rem] self-center' src={remove} alt="" />
                            </button>
                        </div>
                    ))}
                </div>
                <div className='m-5 self-start  align-bottom'>
                    <Link to={'/addevent'}>
                        <Button color="neutral" className='text-slate-500'>Lisa üritus</Button>
                    </Link>
                </div>
            </div>
        </div>
  )
}
