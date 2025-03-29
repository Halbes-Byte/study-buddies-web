export type MeetingDto = {
    id: number,
    title: string,
    description: string,
    date_from: string,
    date_until: string,
    repeatable: string,
    place: string,
    creator: string,
    member: string[]
}

export type CreateMeetingDto = {
    title: string,
    description: string,
    date_from: string,
    date_until: string,
    repeatable: string,
    place: string
}
