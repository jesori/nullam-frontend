import { IPrivateParticipant } from "../domain/IPrivateParticipant";
import httpClient from "../utils/httpclient";

export class PrivateParticipantService {
    private basePath = 'privateparticipant'

    async getAllForEvent(id: string): Promise<IPrivateParticipant[]> {
        console.log("getAll");
        const response = await httpClient.get(`/event/${id}/getAllPrivate`);
        console.log(response);

        const res = await response.data as IPrivateParticipant[];
        return res;
    }

    async put(id: string, data: IPrivateParticipant): Promise<number> {
        console.log("getAll");
        const response = await httpClient.put(`/privateparticipant/${id}`, data);
        console.log(response);

        return response.status;
    }

    async getById(id: string): Promise<IPrivateParticipant> {
        console.log("getById");
        const response = await httpClient.get(`/${this.basePath}/${id}`);
        console.log(response);

        const res = await response.data as IPrivateParticipant;
        return res;
    }

    isValidDate(year: number, month: number, day: number): boolean {
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

    validateId(idNumber: string): boolean {
        if (!/^\d{11}$/.test(idNumber)) {
            return false;
        }

        const year = parseInt(idNumber.substr(1, 2));
        const month = parseInt(idNumber.substr(3, 2));
        const day = parseInt(idNumber.substr(5, 2));

        if (!this.isValidDate(year, month, day)) {
            return false;
        }

        return true;
    }

    

}