import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { PaymentMethod } from '../domain/PaymentMethod';
import { ParticipantType } from '../domain/ParticipanType';

export const Addprticipant = () => {
    const navigate  = useNavigate()
    const [firstName, setFrstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [payment, setPayment] = useState<PaymentMethod>('ByCard');
    const [type, setType] = useState<ParticipantType>('private');
    const [idNumer, setIdNumber] = useState<string>('');
    const [info, setInfo] = useState<string>('');
    useEffect(() => {
        console.log(name);

    }, [name]);

    const addEvent = async () =>{
        if (firstName.length > 0 
            && lastName.length > 0 
            && idNumer.length > 0 
            && payment.length > 0) {
            // const event: IPrivateParticipant = {
            //     name: name,
            //     location: location,
            //     date: eventDate,
            //     info: info
            // }
            // const res = await EventService.add(event)
            // if (res) {
            //     navigate('/')
            // }

        }
    }
    return (
        <div className='flex flex-col'>
            <div className='bg-[#005aa1] h-[70px] flex justify-center'>
                <p className='self-center font-medium text-white'>
                    Urituse lisamine
                </p>
            </div>
            <div className='bg-white flex justify-center h-full p-3'>
                <div className='flex flex-col w-[350px] h-fit'>
                    <p className='text-2xl self-start text-[#005aa1] mt-5'>Urituse lisamine</p>

                    <div className="mt-5 w-full grid gap-3 grid-cols-3 h-fit self-center text-start">
                        <p></p>
                        <div className=' flex felx-row h-7 col-span-2'>
                            <label className='basis-1/2'>
                                <input
                                    className='mr-2'
                                    checked={type === 'private'}
                                    type="radio"
                                    value="private"
                                    onChange={()=> setType('private')}
                                />
                                Eraisik
                            </label>
                            <label className='basis-1/2'>
                                <input
                                    className='mr-2'
                                    checked={type === 'business'}
                                    type="radio"
                                    value="business"
                                    onChange={()=> setType('business')}
                                />
                                Ettevõte
                            </label>
                        </div>
                        <p>Eesnimi:</p>
                        <input
                            className='border h-7 col-span-2'
                            name="isGoing"
                            type=''
                            onChange={(e) => setFrstName(e.target.value)} />
                        <p>Perenimi:</p>
                        <input
                            className='border h-7 col-span-2'
                            name="isGoing"
                            type=''
                            onChange={(e) => setLastName(e.target.value)} />
                        <p>Isikukood:</p>
                        <input
                            className='border h-7 col-span-2'
                            name="isGoing"
                            type=''
                            onChange={(e) => setIdNumber(e.target.value)} />
                        <p>Maksmisviis:</p>
                        <select className='border h-7 col-span-2' onChange={(e) => setPayment(e.target.value === 'sularaha' ? 'InCache' : 'ByCard')}>
                            <option>sularaha</option>
                            <option>pangaülekanne</option>
                        </select>
                        <p>Lisainfo:</p>
                        <textarea
                            maxLength={1500}
                            className='border w-full col-span-2 h-[50px] text-start'
                            name="isGoing"
                            onChange={(e) => setInfo(e.target.value)} />
                        <div className='flex flex-row space-x-4 mt-5'>
                        <Link to={'/'}>
                            <button className='bg-[#e1e1e1] px-3'>Tagasi</button>
                        </Link>
                        <button className='bg-[#005aa1] text-white px-3' onClick={() => addEvent()}>Lisa</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
