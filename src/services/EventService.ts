import { IEvent } from "../domain/IEvent";
import httpClient from "../utils/httpclient";

export class EventService {
    private static basePath = 'Event'

    static async getAll(): Promise<IEvent[]> {
        console.log("getAll");
        const response = await httpClient.get(`/${this.basePath}`);
        console.log(response);

        const res = await response.data as IEvent[];
        return res;
    }

    static async add(event: IEvent): Promise<string> {
        console.log("add");
        console.log(event);
        const response = await httpClient.post(`/${this.basePath}`, event);
        console.log(response);

        const res = await response.data as string;
        return res;
    }

}