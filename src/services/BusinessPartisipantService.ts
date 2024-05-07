import { IBusinessParticipant } from "../domain/IBusinessParticipant";
import { IPrivateParticipant } from "../domain/IPrivateParticipant";
import httpClient from "../utils/httpclient";

export class BusinessParticipantService {
    private basePath = 'businessparticipant'

    async getAllForEvent(id: string): Promise<IBusinessParticipant[]> {
        console.log("getAll");
        const response = await httpClient.get(`/event/${id}/getAllBusiness`);
        console.log(response);

        const res = await response.data as IBusinessParticipant[];
        return res;
    }

    async getAll(): Promise<IBusinessParticipant[]> {
        console.log("getAll");
        const response = await httpClient.get(`/${this.basePath}`);
        console.log(response);

        const res = await response.data as IBusinessParticipant[];
        return res;
    }

    async add(data: IBusinessParticipant): Promise<string> {
        console.log("getAll");
        const response = await httpClient.post(`/${this.basePath}`, data);
        console.log(response);

        return response.data as string;
    }

    async put(id: string, data: IBusinessParticipant): Promise<number> {
        console.log("put");
        const response = await httpClient.put(`/${this.basePath}/${id}`, data);
        console.log(response);

        return response.status;
    }

    async getById(id: string): Promise<IBusinessParticipant> {
        console.log("getById");
        const response = await httpClient.get(`/${this.basePath}/${id}`);
        console.log(response);

        const res = await response.data as IBusinessParticipant;
        return res;
    }

}