import { PaymentMethod } from "./PaymentMethod";

export interface IPrivateParticipant {
    id?: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    paymentMethod: PaymentMethod;
    info?: string;

}