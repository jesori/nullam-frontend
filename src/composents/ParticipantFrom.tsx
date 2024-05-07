import { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useServiceContext } from '../context/ServiceContext';
import { ParticipantType } from '../domain/ParticipanType';
import { PaymentMethod } from '../domain/PaymentMethod';

export type FormData = {
    type: ParticipantType,
    firstName: string;
    lastName: string;
    paymentMethod: PaymentMethod;
    idNumber: string;
    participantsNumber: number;
    info?: string;
}

type ParticipantFormProps = {
    eventId?: string
    privateId?: string
    businessId?: ParticipantType
    initialData?: FormData,
    onSubmit: (data: FormData) => void
}
export const ParticipantFrom:React.FC<ParticipantFormProps> = ({eventId, initialData, onSubmit}) => {
    const { services: {
        privateParticipantService,
    } } = useServiceContext()

    console.log(initialData);
    // const formData = useRef<FormData>({
    //     type: 'private',
    //     firstName: '',
    //     lastName: '',
    //     paymentMethod: PaymentMethod.InCache,
    //     idNumber: '',
    //     info: ''
    // });
    const [formData, setFormData] = useState<FormData>({
        type: 'private',
        firstName: '',
        lastName: '',
        participantsNumber: 1,
        paymentMethod: PaymentMethod.InCache,
        idNumber: '',
        info: ''
    });
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (initialData) {   
            console.log('formData');
            console.log(formData);
            
            setFormData(initialData)
        }
        
    }, [initialData]);

    const validateForm = () => {

        let valid = true;
        const newErrors: string[] = [];
        if (formData.firstName.trim().length <= 0) {
            newErrors.push(formData.type === 'private' ? 'Eesnimi on kohustuslik' : 'Ettevõtenimi on kohustuslik');
            valid = false;
        }

        if (formData.type === 'private') {
            if (!formData.lastName.trim()) {
                newErrors.push('Last name is required');
                valid = false;
            }
        }

        if (!privateParticipantService.validateId(formData.idNumber)) {
            newErrors.push('Id number required or not valid');
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (validateForm()) {
            onSubmit(formData)
            }
        }
    return (
        <div className='flex flex-col w-[350px] h-fit'>
            <p className='text-2xl self-start text-[#005aa1] mt-5'>Urituse lisamine</p>
            <div className='mt-5'>

                {errors.length > 0 && errors.map((e, index) => (
                    <p key={index} className='text-red-400 text-start'>&#x2022; {e}</p>
                ))}
            </div>
            <form onSubmit={submit}>
                <div className="mt-5 w-full grid gap-3 grid-cols-3 h-fit self-center text-start">
                    <p></p>
                    <div className=' flex felx-row h-7 col-span-2'>
                        <label className='basis-1/2'>
                            <input
                                required
                                disabled={eventId === undefined}
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
                                disabled={eventId === undefined}
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
                            <p> Nimi:</p>
                            <input
                                required
                                className='border h-7 col-span-2'
                                name="isGoing"
                                type=''
                                value={formData.firstName}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    firstName: e.target.value
                                })} />
                            <p>Registrikood:</p>
                            <input
                                className='border h-7 col-span-2'
                                name="isGoing"
                                type=''
                                value={formData.idNumber}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    idNumber: e.target.value
                                })} />
                            <p>Osavõtjate arv:</p>
                            <input
                                className='border h-7 col-span-2'
                                name="isGoing"
                                type='number'
                                min="1" max="100"
                                value={formData.participantsNumber}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    participantsNumber: Number.parseInt(e.target.value)
                                })} />
                        </>
                        :
                        <>
                            <p>Eesnimi:</p>
                            <input
                                className='border h-7 col-span-2'
                                name="isGoing"
                                value={formData.firstName}
                                type=''
                                onChange={(e) => setFormData({
                                    ...formData,
                                    firstName: e.target.value
                                })} />
                            <p>Perenimi:</p>
                            <input
                                className='border h-7 col-span-2'
                                name="isGoing"
                                value={formData.lastName}
                                type=''
                                onChange={(e) => setFormData({
                                    ...formData,
                                    lastName: e.target.value
                                })} />
                            <p>Isikukood:</p>
                            <input
                                className='border h-7 col-span-2'
                                name="isGoing"
                                value={formData.idNumber}
                                type=''
                                onChange={(e) => setFormData({
                                    ...formData,
                                    idNumber: e.target.value
                                })} />
                        </>
                    }
                    <p>Maksmisviis:</p>
                    <select className='border h-7 col-span-2'
                        value={formData.paymentMethod === PaymentMethod.InCache ? 'sularaha' : 'pangaülekanne'}
                        onChange={(e) => setFormData({
                            ...formData,
                            paymentMethod: e.target.value === 'sularaha' ? PaymentMethod.InCache : PaymentMethod.ByCard
                        })}>
                        <option>sularaha</option>
                        <option>pangaülekanne</option>
                    </select>
                    <p>Lisainfo:</p>
                    <textarea
                        maxLength={1500}
                        className='border w-full col-span-2 h-[50px] text-start'
                        name="isGoing"
                        value={formData.info}
                        onChange={(e) => setFormData({
                            ...formData,
                            info: e.target.value
                        })} />
                    <div className='flex flex-row space-x-4 mt-5'>
                        <Link to={'/'}>
                            <button className='bg-[#e1e1e1] px-3'>Tagasi</button>
                        </Link>
                        <button className='bg-[#005aa1] text-white px-3' type="submit"  >
                            {eventId ?
                                <p>Lisa</p> :
                                <p>Slvesta</p>
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
