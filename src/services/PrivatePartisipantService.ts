import { IPrivateParticipant } from "../domain/IPrivateParticipant";
import httpClient from "../utils/httpclient";

const BASEPATH = 'privateparticipant'

export async function getAllPPartForEvent(id: string): Promise<IPrivateParticipant[]> {
    console.log("getAll");
    const response = await httpClient.get(`/event/${id}/getAllPrivate`);
    console.log(response);

    const res = await response.data as IPrivateParticipant[];
    return res;
}

export async function getAllPPart(): Promise<IPrivateParticipant[]> {
    console.log("getAll");
    const response = await httpClient.get(`/${BASEPATH}`);
    console.log(response);

    const res = await response.data as IPrivateParticipant[];
    return res;
}

export async function addPPart(data: IPrivateParticipant): Promise<string> {
    console.log("getAll");
    const response = await httpClient.post(`/${BASEPATH}`, data);
    console.log(response);

    return response.data as string;
}

export async function putPPart(id: string, data: IPrivateParticipant): Promise<number> {
    console.log("getAll");
    const response = await httpClient.put(`/${BASEPATH}/${id}`, data);
    console.log(response);

    return response.status;
}

export async function getPPartById(id: string): Promise<IPrivateParticipant> {
    console.log("getById");
    const response = await httpClient.get(`/${BASEPATH}/${id}`);
    console.log(response);

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