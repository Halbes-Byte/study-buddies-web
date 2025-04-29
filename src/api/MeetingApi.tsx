import {CreateMeetingDto, MeetingDto} from "../dtos/MeetingDto";
import {AxiosInstance} from "axios";
import {handleErrorResponse, handleSuccessResponse} from "./ErrorHandling";
import {Resources} from "../App";

export function createMeeting(axios: AxiosInstance, meetingDto: CreateMeetingDto): Promise<CreateMeetingDto> {
    return axios.post(`/${Resources.MEETING}`, meetingDto)
        .then(handleSuccessResponse, handleErrorResponse);
}

export function updateMeeting(axios: AxiosInstance, meetingId: string, meetingDto: CreateMeetingDto): Promise<CreateMeetingDto> {
    return axios.put(`/${Resources.MEETING}?id=${meetingId}`, meetingDto)
        .then(handleSuccessResponse, handleErrorResponse);
}

export function deleteMeeting(axios: AxiosInstance, meetingId: string): Promise<CreateMeetingDto> {
    return axios.delete(`/${Resources.MEETING}?id=${meetingId}`)
        .then(handleSuccessResponse, handleErrorResponse);
}

export function getMeetings(axios: AxiosInstance): Promise<MeetingDto[]> {
    const url = `/${Resources.MEETING}`;
    return axios.get(url)
        .then(handleSuccessResponse, handleErrorResponse)
        .then((listRes) => {
            return listRes;
        });
}

export function getMeetingsOfWeek(axios: AxiosInstance): Promise<MeetingDto[]> {
    const url = `/${Resources.MEETING}?thisWeek=true`;
    return axios.get(url)
        .then(handleSuccessResponse, handleErrorResponse)
        .then((listRes) => {
            return listRes;
        });
}

export function getMeetingsForModule(axios: AxiosInstance, module: string): Promise<MeetingDto[]> {
    const url = `/${Resources.MEETING}?module=${module}`;
    return axios.get(url)
        .then(handleSuccessResponse, handleErrorResponse)
        .then((listRes) => {
            return listRes;
        });
}

