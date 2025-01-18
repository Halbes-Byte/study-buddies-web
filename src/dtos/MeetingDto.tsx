export type MeetingDto = {
    title: string,
    description: string,
    date_from: string,
    date_until: string,
    repeatable: string,
    place: string
}

export const defaultMeetingDto: MeetingDto = ({
    title: "",
    description: "",
    date_from: "",
    date_until: "",
    repeatable: "",
    place: ""
});
