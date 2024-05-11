import { AxiosResponse } from "axios";
import { IEvent } from "../domain/IEvent";
import httpClient from "../utils/httpclient";

const BASEPATH = 'Event'

export async function getAllEvents(): Promise<IEvent[]> {
    console.log("getAllEvents");
    const response = await httpClient.get(`/${BASEPATH}`);
    const res = await response.data as IEvent[];
    return res;
}

export async function getEventById(id: string): Promise<IEvent> {
    console.log("getEventById");
    const response = await httpClient.get(`/${BASEPATH}/${id}`);
    const res = await response.data as IEvent;
    res.date = new Date(res.date).toLocaleString()
    return res;
}

export async function addEvent(event: IEvent): Promise<string> {
    console.log("addEvent");
    const response = await httpClient.post(`/${BASEPATH}`, event);

    const res = await response.data as string;
    return res;
}

export async function removeEvent(id: string): Promise<AxiosResponse> {
    console.log("removeEvent");
    const response = await httpClient.delete(`/${BASEPATH}/${id}`);
    return response;
}

export async function addPrivateParticipantToEvent(eventId: string, participantId: string): Promise<number> {
    console.log("addprivate to event");
    const response = await httpClient.post(`/${BASEPATH}/${eventId}/addPrivate`, {
        eventId: eventId,
        privateParticipantId: participantId
    });
    return response.status;
}

export async function addBusinessParticipantToEvent(eventId: string, participantId: string): Promise<number> {
    console.log("addbusiness to event");
    const response = await httpClient.post(`/${BASEPATH}/${eventId}/addBusiness`, {
        eventId: eventId,
        businessParticipantId: participantId
    });
    return response.status;
}

export async function removeBusinessParticipantFromEvent(eventParticipantId: string): Promise<number> {
    console.log("removeparticipant");
    const response = await httpClient.delete(`/${BASEPATH}/removeParticipant/${eventParticipantId}`);
    return response.status;
}