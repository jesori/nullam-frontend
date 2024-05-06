import { IPrivateParticipant } from "../domain/IPrivateParticipant";
import httpClient from "../utils/httpclient";

export class PrivateParticipantService {
    private basePath = 'PrivateParticipant'

    async getAll(): Promise<IPrivateParticipant[]> {
        console.log("getAll");
        const response = await httpClient.get(`/${this.basePath}`);
        console.log(response);

        const res = await response.data as IPrivateParticipant[];
        return res;
    }

}