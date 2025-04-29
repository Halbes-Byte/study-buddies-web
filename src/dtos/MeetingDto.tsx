import {ChangeType} from "../enum/ChangeType";

export type MeetingDto = {
    id: string,
    superId: number,
    title: string,
    description: string,
    dateFrom: string,
    dateUntil: string,
    repeatable: string,
    place: string,
    creator: string,
    member: string[]
}

export type CreateMeetingDto = {
    title: string,
    description: string,
    dateFrom: string,
    dateUntil: string,
    repeatable: string,
    place: string,
    changeType?: ChangeType,
}
