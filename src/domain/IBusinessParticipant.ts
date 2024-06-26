import { PaymentMethod } from "./PaymentMethod";

export interface IBusinessParticipant {
    id?: string;
    name: string;
    idNumber: string;
    participantsNumber: number;
    paymentMethod: PaymentMethod;
    info?: string;

}