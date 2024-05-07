import { ParticipantType } from "./ParticipanType";
import { PaymentMethod } from "./PaymentMethod";

export interface IPatricipant {
    id?: string;
    participantEventId?: string;
    name: string;
    idNumber: string;
    type: ParticipantType;
    paymentMethod: PaymentMethod;
    info?: string;
} 