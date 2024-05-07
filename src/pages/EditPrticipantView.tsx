import { useEffect, useState } from 'react'
import { FormData, ParticipantFrom } from '../composents/ParticipantFrom';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useServiceContext } from '../context/ServiceContext';
import { IPrivateParticipant } from '../domain/IPrivateParticipant';
import { IBusinessParticipant } from '../domain/IBusinessParticipant';
import { PageHeader } from '../composents/PageHeader';



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
    return (
        <div className='flex flex-col h-full'>
            <PageHeader content='Osaleja info'></PageHeader>
            <div className='bg-white flex justify-center h-full p-3'>
                <ParticipantFrom initialData={initialData} onSubmit={updateParticipant} />
            </div>
        </div>
    )
}
