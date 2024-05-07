import { useEffect, useState } from 'react'
import { FormData, ParticipantFrom } from '../composents/ParticipantFrom';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useServiceContext } from '../context/ServiceContext';
import { IPrivateParticipant } from '../domain/IPrivateParticipant';
import { IBusinessParticipant } from '../domain/IBusinessParticipant';



export const EditParticipantView = () => {
    const { id, } = useParams();
    const [searchParams] = useSearchParams();
    const { services } = useServiceContext()
    const navigate = useNavigate()
    const [initialData, setInitialData] = useState<FormData>()

    useEffect(() => {
        const getEvent = async () => {
            if (searchParams && id) {
                if (searchParams.get('type') == 'private') {
                    
                    const part = await services.privateParticipantService.getById(id)
                    if (part) {
                        setInitialData({
                            firstName: part.firstName,
                            lastName: part.lastName,
                            type: 'private',
                            paymentMethod: part.paymentMethod,
                            idNumber: part.idNumber,
                            participantsNumber: 0,
                            info: part.info
                        })
                    }
                }
                if (searchParams.get('type') == 'business') {
                    const part = await services.businessParticipantService.getById(id)
                    if (part) {
                        setInitialData({
                            firstName: part.name,
                            lastName: '',
                            type: 'business',
                            paymentMethod: part.paymentMethod,
                            idNumber: part.idNumber,
                            participantsNumber: 0,
                            info: part.info
                       })
                    }
                }
            }
        }
        getEvent()
    }, []);

    const updateParticipant = async (data: FormData) => {
        if (id) {
            if (data.type === 'private') {
                const privateData: IPrivateParticipant = {
                    id: id,
                    ...data,
                }
                const res = await services.privateParticipantService.put(id, privateData);
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
    // const addParticipant = async (event: FormEvent<HTMLFormElement>) => {
    //     console.log('asd');

    //     event.preventDefault()
    //     if (validateForm()) {
    //         console.log(formData);

    //         // const event: IPrivateParticipant = {
    //         //     name: name,
    //         //     location: location,
    //         //     date: eventDate,
    //         //     info: info
    //         // }
    //         // const res = await EventService.add(event)
    //         // if (res) {
    //         //     navigate('/')
    //         // }

    //     }
    // }
    return (
        <div className='flex flex-col h-full'>
            <div className='bg-[#005aa1] h-[70px] flex justify-center'>
                <p className='self-center font-medium text-white'>
                    Urituse lisamine
                </p>
            </div>
            <div className='bg-white flex justify-center h-full p-3'>
                <ParticipantFrom initialData={initialData} onSubmit={updateParticipant} />
                {/* <div className='flex flex-col w-[350px] h-fit'>
                    <p className='text-2xl self-start text-[#005aa1] mt-5'>Urituse lisamine</p>
                    <div className='mt-5'>

                        {errors.length > 0 && errors.map((e, index) => (
                            <p key={index} className='text-red-400 text-start'>&#x2022; {e}</p>
                        ))}
                    </div>
                    <form onSubmit={addParticipant}>
                        <div className="mt-5 w-full grid gap-3 grid-cols-3 h-fit self-center text-start">
                            <p></p>
                            <div className=' flex felx-row h-7 col-span-2'>
                                <label className='basis-1/2'>
                                    <input
                                        required
                                        className='mr-2'
                                        checked={formData.type === 'private'}
                                        type="radio"
                                        value="private"
                                        onChange={() => setFormData({
                                            ...formData,
                                            type: 'private'
                                        })}
                                    />
                                    Eraisik
                                </label>
                                <label className='basis-1/2'>
                                    <input
                                        className='mr-2'
                                        checked={formData.type === 'business'}
                                        type="radio"
                                        value="business"
                                        onChange={() => setFormData({
                                            ...formData,
                                            type: 'business'
                                        })}
                                    />
                                    Ettevõte
                                </label>
                            </div>
                            {formData.type === 'business' ?
                                <>
                                    <p> Nimi :</p>
                                    <input
                                        required
                                        className='border h-7 col-span-2'
                                        name="isGoing"
                                        type=''
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            firstName: e.target.value
                                        })} />
                                    <p>Registrikood:</p>
                                    <input
                                        className='border h-7 col-span-2'
                                        name="isGoing"
                                        type=''
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            idNumer: e.target.value
                                        })} />
                                </>
                                :
                                <>
                                    <p>Eesnimi:</p>
                                    <input
                                        className='border h-7 col-span-2'
                                        name="isGoing"
                                        type=''
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            firstName: e.target.value
                                        })} />
                                    <p>Perenimi:</p>
                                    <input
                                        className='border h-7 col-span-2'
                                        name="isGoing"
                                        type=''
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            lastName: e.target.value
                                        })} />
                                    <p>Isikukood:</p>
                                    <input
                                        className='border h-7 col-span-2'
                                        name="isGoing"
                                        type=''
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            idNumer: e.target.value
                                        })} />
                                </>
                            }
                            <p>Maksmisviis:</p>
                            <select className='border h-7 col-span-2' onChange={(e) => setFormData({
                                ...formData,
                                payment: e.target.value === 'sularaha' ? 'InCache' : 'ByCard'
                            })}>
                                <option>sularaha</option>
                                <option>pangaülekanne</option>
                            </select>
                            <p>Lisainfo:</p>
                            <textarea
                                maxLength={1500}
                                className='border w-full col-span-2 h-[50px] text-start'
                                name="isGoing"
                                onChange={(e) => setFormData({
                                    ...formData,
                                    info: e.target.value
                                })} />
                            <div className='flex flex-row space-x-4 mt-5'>
                                <Link to={'/'}>
                                    <button className='bg-[#e1e1e1] px-3'>Tagasi</button>
                                </Link>
                                <button className='bg-[#005aa1] text-white px-3' type="submit"  >
                                    Lisa
                                </button>
                            </div>
                        </div>
                    </form>
                </div> */}
            </div>
        </div>
    )
}
