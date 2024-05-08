import { useEffect, useState } from 'react'
import { FormData, ParticipantFrom } from '../composents/ParticipantFrom';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IPrivateParticipant } from '../domain/IPrivateParticipant';
import { IBusinessParticipant } from '../domain/IBusinessParticipant';
import { PageHeader } from '../composents/PageHeader';
import { getPPartById, putPPart } from '../services/PrivatePartisipantService';
import { getBPartById, putBPart } from '../services/BusinessPartisipantService';



export const EditParticipantView = () => {
    const { id, } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    // const type = searchParams.get('type')
    const [initialData, setInitialData] = useState<FormData>()
    // const { data: privatePart} = useQuery({queryFn: () => getPPartById(id || ''),queryKey:['ppart', id], enabled: type === 'privale'})
    // const { data: businessPart} = useQuery({queryFn: () => getBPartById(id || ''), queryKey:['ppart', id], enabled: type === 'business'})

    useEffect(() => {
        const getParticipant = async () => {
            
            if (searchParams && id) {
                console.log(searchParams, id, searchParams.get('type'));
                if (searchParams.get('type') == 'private') {
                    
                    const part = await getPPartById(id)
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
                    const part = await getBPartById(id)
                    console.log('part');
                    console.log(part);
                    if (part) {
                        setInitialData({
                            firstName: part.name,
                            lastName: '',
                            type: 'business',
                            paymentMethod: part.paymentMethod,
                            idNumber: part.idNumber,
                            participantsNumber: part.participantsNumber,
                            info: part.info
                       })
                    }
                }
            }
        }
        getParticipant()
    }, []);

    const updateParticipant = async (data: FormData) => {
        if (id) {
            if (data.type === 'private') {
                const privateData: IPrivateParticipant = {
                    id: id,
                    ...data,
                }
                const res = await putPPart(id, privateData);
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
                const res = await putBPart(id, businessData);
                if (res < 300) {
                    navigate('/')
                }
            }
        }
    }
    return (
        <div className='flex flex-col h-full'>
            <PageHeader content='Osaleja info'></PageHeader>
            <div className='bg-white flex flex justify-center h-full p-3'>
                <div className='flex flex-col'>
                    <p className='text-2xl self-start text-[#005aa1] mt-5'>Osavõtjs nimi</p>
                    <ParticipantFrom initialData={initialData} onSubmit={updateParticipant} />
                </div>
            </div>
        </div>
    )
}
