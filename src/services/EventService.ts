import { IEvent } from "../domain/IEvent";
import httpClient from "../utils/httpclient";

export class EventService {
    private basePath = 'Event'

    async getAll(): Promise<IEvent[]> {
        console.log("getAll");
        const response = await httpClient.get(`/${this.basePath}`);
    console.log(response);

    const res = response.data as IEvent[];
    return res;
  }

}