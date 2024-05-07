import { IEvent } from "../domain/IEvent";
import httpClient from "../utils/httpclient";

export class EventService {
    
    private  basePath = 'Event'

    async getAll(): Promise<IEvent[]> {
        console.log("getAll");
        const response = await httpClient.get(`/${this.basePath}`);
        console.log(response);

        const res = await response.data as IEvent[];
        return res;
    }

    async getById(id: string): Promise<IEvent> {
        console.log("getById");
        const response = await httpClient.get(`/${this.basePath}/${id}`);
        console.log(response);

        const res = await response.data as IEvent;
        return res;
    }

    async add(event: IEvent): Promise<string> {
        console.log("add");
        console.log(event);
        const response = await httpClient.post(`/${this.basePath}`, event);
        console.log(response);

        const res = await response.data as string;
        return res;
    }

    async addPrivateParticipantToEvent(eventId: string, participantId: string): Promise<number> {
        console.log("addprivate");
        const response = await httpClient.post(`/${this.basePath}/${eventId}/addPrivate`, {
            eventId: eventId,
            privateParticipantId: participantId
        });
        return response.status;
    }

    async addBusinessParticipantToEvent(eventId: string, participantId: string): Promise<number> {
        console.log("addprivate");
        const response = await httpClient.post(`/${this.basePath}/${eventId}/addBusiness`, {
            eventId: eventId,
            businessParticipantId: participantId
        });
        return response.status;
    }

    async removeBusinessParticipantFromEvent(eventParticipantId: string): Promise<number> {
        console.log("removeparticipant");
        const response = await httpClient.delete(`/${this.basePath}/removeParticipant/${eventParticipantId}`);
        return response.status;
    }

}