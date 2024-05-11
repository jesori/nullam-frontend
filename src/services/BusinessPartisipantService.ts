import { IBusinessParticipant } from "../domain/IBusinessParticipant";
import httpClient from "../utils/httpclient";

const BASEPATH = 'businessparticipant'

export async function getAllBPartForEvent(id: string): Promise<IBusinessParticipant[]> {
    console.log("getAllBPartFroEvent");
    const response = await httpClient.get(`/event/${id}/getAllBusiness`);
    const res = await response.data as IBusinessParticipant[];
    return res;
}

export async function getAllBPart(): Promise<IBusinessParticipant[]> {
    console.log("getAllBPart");
    const response = await httpClient.get(`/${BASEPATH}`);
    const res = await response.data as IBusinessParticipant[];
    return res;
}

export async function addBPart(data: IBusinessParticipant): Promise<string> {
    console.log("addBPart");
    const response = await httpClient.post(`/${BASEPATH}`, data);
    return response.data as string;
}

export async function putBPart(id: string, data: IBusinessParticipant): Promise<number> {
    console.log("putBPart");
    const response = await httpClient.put(`/${BASEPATH}/${id}`, data);
    return response.status;
}

export async function getBPartById(id: string): Promise<IBusinessParticipant> {
    console.log("getBPartById");
    const response = await httpClient.get(`/${BASEPATH}/${id}`);
    const res = await response.data as IBusinessParticipant;
    return res;
}
