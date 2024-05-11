import { IEventParticipant } from "../domain/IEventParticipant";
import { IPatricipant } from "../domain/IParticipant";
import httpClient from "../utils/httpclient";
import { getAllBPart } from "./BusinessPartisipantService";
import { getAllPPart } from "./PrivatePartisipantService";


export async function getAllparticipantsForEvent(id: string): Promise<IPatricipant[]> {
    console.log("getAllpart");
    const response = await httpClient.get(`/event/${id}/getAllParticipants`);

    const allParticipants = response.data as IEventParticipant[]
    const participants: IPatricipant[] = []

    if (allParticipants) {
        allParticipants.forEach(p => {

            if (p.businessParticipant) {
                participants.push({
                    id: p.businessParticipantId,
                    participantEventId: p.id,
                    name: p.businessParticipant.name,
                    idNumber: p.businessParticipant.idNumber,
                    paymentMethod: p.businessParticipant.paymentMethod,
                    type: 'business'
                })
            }
            if (p.privateParticipant) {

                participants.push({
                    id: p.privateParticipantId,
                    participantEventId: p.id,
                    name: [p.privateParticipant.firstName, p.privateParticipant.lastName].join(" "),
                    idNumber: p.privateParticipant.idNumber,
                    paymentMethod: p.privateParticipant.paymentMethod,
                    type: 'private'
                })
            }
        });
    }
    return participants.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAllparticipants(): Promise<IPatricipant[]> {
    console.log("getAllpart");
    const privatePart = await getAllPPart();
    const busines = await getAllBPart();

    const participants: IPatricipant[] = []

    busines.forEach(p => {
        participants.push({
            id: p.id,
            name: p.name,
            idNumber: p.idNumber,
            paymentMethod: p.paymentMethod,
            type: 'business'
        })
    });
    privatePart.forEach(p => {
        participants.push({
            id: p.id,
            participantEventId: p.id,
            name: [p.firstName, p.lastName].join(" "),
            idNumber: p.idNumber,
            paymentMethod: p.paymentMethod,
            type: 'private'
        })
    })
    return participants.sort((a, b) => a.name.localeCompare(b.name));
}