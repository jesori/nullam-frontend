// import {  ReactNode, useContext, useState } from 'react';
// import { PrivateParticipantService } from '../services/PrivatePartisipantService';
// import { BusinessParticipantService } from '../services/BusinessPartisipantService';
// import React from 'react';
// import { ParticipantService } from '../services/ParticipantService';

// export type Services = {
//     privateParticipantService: PrivateParticipantService,
//     businessParticipantService: BusinessParticipantService,
//     participantService: ParticipantService
// }

// export type ServiceContextType = {
//     services: Services;
// }

// export const ServiceContex = React.createContext<ServiceContextType | undefined>(undefined);

// type ServiceProviderProps = {
//     children: ReactNode;
// }

// export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
//     const [services] = useState<Services>({
//         privateParticipantService: new PrivateParticipantService(),
//         businessParticipantService: new BusinessParticipantService(),
//         participantService: new ParticipantService()
//     });
//     return <ServiceContex.Provider value={{services}}>{ children }</ServiceContex.Provider>
// };

// export const useServiceContext = () => {
//     const serviceContext = useContext(ServiceContex)
//     if (!serviceContext) throw ''
//     return serviceContext
// }
