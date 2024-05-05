import { PaymentMethod } from "./PaymentMethod";

export interface IPrivateParticipant {
    id?: string;
    firstName: string;
    lastName: string;
    idNumber: Date;
    PaymentMethod: PaymentMethod;
    info?: string;

}