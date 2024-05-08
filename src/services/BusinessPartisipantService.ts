import { IBusinessParticipant } from "../domain/IBusinessParticipant";
import httpClient from "../utils/httpclient";

const BASEPATH = 'businessparticipant'

export async function getAllBPartForEvent(id: string): Promise<IBusinessParticipant[]> {
    console.log("getAll");
    const response = await httpClient.get(`/event/${id}/getAllBusiness`);
    console.log(response);

    const res = await response.data as IBusinessParticipant[];
    return res;
}

export async function getAllBPart(): Promise<IBusinessParticipant[]> {
    console.log("getAll");
    const response = await httpClient.get(`/${BASEPATH}`);
    console.log(response);

    const res = await response.data as IBusinessParticipant[];
    return res;
}

export async function addBPart(data: IBusinessParticipant): Promise<string> {
    console.log("add bpart");
    const response = await httpClient.post(`/${BASEPATH}`, data);
    console.log(response);

    return response.data as string;
}

export async function putBPart(id: string, data: IBusinessParticipant): Promise<number> {
    console.log("put");
    const response = await httpClient.put(`/${BASEPATH}/${id}`, data);
    console.log(response);

    return response.status;
}

export async function getBPartById(id: string): Promise<IBusinessParticipant> {
    console.log("getById");
    const response = await httpClient.get(`/${BASEPATH}/${id}`);
    console.log(response);

    const res = await response.data as IBusinessParticipant;
    return res;
}
