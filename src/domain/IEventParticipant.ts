import { IBusinessParticipant } from "./IBusinessParticipant";
import { IPrivateParticipant } from "./IPrivateParticipant";

export interface IEventParticipant {
    id: string;
    eventId: string;
    privateParticipantId?: string;
    privateParticipant?: IPrivateParticipant;
    businessParticipantId?: string;
    businessParticipant?: IBusinessParticipant;
}