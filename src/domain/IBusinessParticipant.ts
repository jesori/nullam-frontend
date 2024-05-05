import { PaymentMethod } from "./PaymentMethod";

export interface IBusinessParticipant {
    id?: string;
    Name: string;
    ParticipantsNumber: number;
    PaymentMethod: PaymentMethod;
    info?: string;

}