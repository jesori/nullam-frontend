import { IBusinessParticipant } from "../domain/IBusinessParticipant";
import httpClient from "../utils/httpclient";

export class BusinessParticipantService {
    private basePath = 'PrivateParticipant'

    async getAll(): Promise<IBusinessParticipant[]> {
        console.log("getAll");
        const response = await httpClient.get(`/${this.basePath}`);
        console.log(response);

        const res = await response.data as IBusinessParticipant[];
        return res;
    }

}