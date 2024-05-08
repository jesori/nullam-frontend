import { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ParticipantType } from '../domain/ParticipanType';
import { PaymentMethod } from '../domain/PaymentMethod';
import { Button, Input, Option, Radio, Select, Textarea } from '@mui/joy';
import { validateId } from '../services/PrivatePartisipantService';

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
            
            if (!validateId(formData.idNumber)) {
                newErrors.push('Id number required or not valid');
                valid = false;
            }
        } else {
            if (!formData.idNumber) {
                newErrors.push('Id Code required or not valid');
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (validateForm()) {
            onSubmit(formData)
            setFormData({
                type: 'private',
                firstName: '',
                lastName: '',
                participantsNumber: 1,
                paymentMethod: PaymentMethod.InCache,
                idNumber: '',
                info: ''
            })
        }
    }

    const selectOnChange = (
        event: React.SyntheticEvent | null,
        newValue: number | null,
    ) => {
        console.log(newValue);
        
        if (newValue) {
            setFormData({
                ...formData,
                paymentMethod: newValue
            })
        }
    };

    return (
        <div className='flex flex-col w-full h-fit'>
            <div className='mt-2'>
                {errors.length > 0 && errors.map((e, index) => (
                    <p key={index} className='text-red-400 text-start'>&#x2022; {e}</p>
                ))}
            </div>
            <form onSubmit={submit}>
                <div className="mt-5 w-full grid gap-3 grid-cols-3 h-fit self-center text-start">
                    <p></p>
                    <div className=' flex felx-row h-7 col-span-2'>
                        <Radio
                            required
                            label='Eraisik'
                            disabled={eventId === undefined}
                            className='basis-1/2 mr-2'
                            checked={formData.type === 'private'}
                            value="private"
                            onChange={() => setFormData({
                                ...formData,
                                type: 'private'
                            })}
                        />
                        <Radio
                            disabled={eventId === undefined}
                            className='basis-1/2 mr-2'
                            label='Ettevõte'
                            checked={formData.type === 'business'}
                            value="business"
                            onChange={() => setFormData({
                                ...formData,
                                type: 'business'
                            })}
                        />
                    </div>
                    {formData.type === 'business' ?
                        <>
                            <p> Nimi:</p>
                            <Input
                                required
                                className='border h-7 col-span-2'
                                type=''
                                value={formData.firstName}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    firstName: e.target.value
                                })} />
                            <p>Registrikood:</p>
                            <Input
                                className='border h-7 col-span-2'
                                value={formData.idNumber}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    idNumber: e.target.value
                                })} />
                            <p>Osavõtjate arv:</p>
                            <Input
                                className='border h-7 col-span-2'
                                type='number'
                                slotProps={{
                                    input: {
                                      min: 1,
                                      max: 99,
                                      step: 1,
                                    },
                                  }}
                                value={formData.participantsNumber}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    participantsNumber: Number.parseInt(e.target.value)
                                })} />
                        </>
                        :
                        <>
                            <p>Eesnimi:</p>
                            <Input
                                className='border h-7 col-span-2'
                                name="isGoing"
                                value={formData.firstName}
                                type=''
                                onChange={(e) => setFormData({
                                    ...formData,
                                    firstName: e.target.value
                                })} />
                            <p>Perenimi:</p>
                            <Input
                                className='border h-7 col-span-2'
                                name="isGoing"
                                value={formData.lastName}
                                type=''
                                onChange={(e) => setFormData({
                                    ...formData,
                                    lastName: e.target.value
                                })} />
                            <p>Isikukood:</p>
                            <Input
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
                    <Select className='border h-7 col-span-2'
                        defaultValue={formData.paymentMethod}
                        onChange={selectOnChange}>
                        <Option value={PaymentMethod.InCache}>sularaha</Option>
                        <Option value={PaymentMethod.ByCard}>pangaülekanne</Option>
                    </Select>
                    <p>Lisainfo:</p>
                    <Textarea
                        className='border w-full col-span-2 h-[4rem] text-start'
                        name="isGoing"
                        value={formData.info}
                        onChange={(e) => setFormData({
                            ...formData,
                            info: e.target.value
                        })} />
                    <div className='flex flex-row space-x-4 mt-5'>
                        <Link to={'/'}>
                            <Button color="neutral" size='sm' className='bg-[#e1e1e1] px-3'>Tagasi</Button>
                        </Link>
                        <Button size='sm' className='bg-[#005aa1] text-white px-3' type="submit"  >
                            {eventId ?
                                <p>Lisa</p> :
                                <p>Slvesta</p>
                            }
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
