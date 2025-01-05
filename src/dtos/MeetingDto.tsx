export type MeetingDto = {
    title: string,
    description: string,
    links: string,
    date_from: string,
    date_until: string,
    repeatable: string,
    place: string
}

export const defaultMeetingDto: MeetingDto = ({
    title: "",
    description: "",
    links: "",
    date_from: "",
    date_until: "",
    repeatable: "",
    place: ""
});
