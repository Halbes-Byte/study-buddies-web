import {MeetingDto} from "../dtos/MeetingDto";
import { AxiosInstance } from "axios";
import {handleErrorResponse, handleSuccessResponse} from "./ErrorHandling";

export function createMeeting(axios: AxiosInstance, meetingDto: MeetingDto): Promise<MeetingDto> {
    const url = "/meeting";
    return axios.post(url, meetingDto)
        .then(handleSuccessResponse, handleErrorResponse);
}

export function getMeetings(axios: AxiosInstance): Promise<MeetingDto[]> {
    const url = "/meeting";
    return axios.get(url)
        .then(handleSuccessResponse, handleErrorResponse)
        .then((listRes) => {
            return listRes;
        });
}