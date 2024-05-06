import {  ReactNode, createContext, useContext, useState } from 'react';
import { PrivateParticipantService } from '../services/PrivatePartisipantService';
import { BusinessParticipantService } from '../services/BusinessPartisipantService';
import { EventService } from '../services/EventService';
import React from 'react';

type Services = {
    privateParticipantService: PrivateParticipantService,
    businessParticipantService: BusinessParticipantService,
    eventserveice: EventService
}

type ServiceContextType = {
    services: Services;
}

export const ServiceContex = React.createContext<ServiceContextType | undefined>(undefined);

type ServiceProviderProps = {
    children: ReactNode;
}

export const ServiceProvider:React.FC<ServiceProviderProps> = ({ children, ...props}) => {
    const [services] = useState<Services>({
        privateParticipantService: new PrivateParticipantService(),
        businessParticipantService: new BusinessParticipantService(),
        eventserveice: new EventService()

    });
    return <ServiceContex.Provider value={{services}}>{ children }</ServiceContex.Provider>
};

export const useServiceContext = () => {
    const serviceContext = useContext(ServiceContex)
    if (!serviceContext) throw ''
    return serviceContext
}
