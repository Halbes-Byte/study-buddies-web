import {ChangeType} from "../enum/ChangeType";

export type MeetingDto = {
    id: string,
    superId: number,
    module: string,
    description: string,
    dateFrom: string,
    dateUntil: string,
    repeatable: string,
    place: string,
    creator: string,
    member: string[]
}

export type CreateMeetingDto = {
    module: string,
    description: string,
    dateFrom: string,
    dateUntil: string,
    repeatable: string,
    place: string,
    changeType?: ChangeType,
}
