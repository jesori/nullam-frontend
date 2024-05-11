import { IPrivateParticipant } from "../domain/IPrivateParticipant";
import httpClient from "../utils/httpclient";

const BASEPATH = 'privateparticipant'

export async function getAllPPartForEvent(id: string): Promise<IPrivateParticipant[]> {
    console.log("getAllPpartForEvent");
    const response = await httpClient.get(`/event/${id}/getAllPrivate`);

    const res = await response.data as IPrivateParticipant[];
    return res;
}

export async function getAllPPart(): Promise<IPrivateParticipant[]> {
    console.log("getAllPpart");
    const response = await httpClient.get(`/${BASEPATH}`);
    const res = await response.data as IPrivateParticipant[];
    return res;
}

export async function addPPart(data: IPrivateParticipant): Promise<string> {
    console.log("addPpart");
    const response = await httpClient.post(`/${BASEPATH}`, data);
    return response.data as string;
}

export async function putPPart(id: string, data: IPrivateParticipant): Promise<number> {
    console.log("putPpart");
    const response = await httpClient.put(`/${BASEPATH}/${id}`, data);
    return response.status;
}

export async function getPPartById(id: string): Promise<IPrivateParticipant> {
    console.log("getPpartById");
    const response = await httpClient.get(`/${BASEPATH}/${id}`);
    const res = await response.data as IPrivateParticipant;
    return res;
}

function isValidDate(year: number, month: number, day: number): boolean {
    if (year < 0 || year > 99) {
        return false;
    }
    if (month < 1 || month > 12) {
        return false;
    }
    const daysInMonth = new Date(year + 1900, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false;
    }
    return true;
}

export function validateId(idNumber: string): boolean {
    if (!/^\d{11}$/.test(idNumber)) {
        return false;
    }

    const year = parseInt(idNumber.substr(1, 2));
    const month = parseInt(idNumber.substr(3, 2));
    const day = parseInt(idNumber.substr(5, 2));

    if (!isValidDate(year, month, day)) {
        return false;
    }

    return true;
}