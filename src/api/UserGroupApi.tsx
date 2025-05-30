import {AxiosInstance} from "axios";
import {Resources} from "../App";
import {handleErrorResponse, handleSuccessResponse} from "./ErrorHandling";

export function joinStudyGroup(axios: AxiosInstance, meetingId: string): Promise<void> {
    return axios.post(`/${Resources.USERGROUP}`, {meetingId})
        .then(handleSuccessResponse, handleErrorResponse);
}

export function joinSuperStudyGroup(axios: AxiosInstance, superMeetingId: string): Promise<void> {
    const meetingId = "";
    return axios.post(`/${Resources.USERGROUP}`, {superMeetingId, meetingId})
        .then(handleSuccessResponse, handleErrorResponse);
}

export async function getUserIdsForMeeting(axios: AxiosInstance, uuid: string): Promise<string[]> {
    const res = await axios.get(`/studygroup?uuid=${uuid}`);
    const data = res.data;
    const userIds = data.map((entry: { userId: string }) => entry.userId);
    return userIds;
}

export function leaveStudyGroup(axios: AxiosInstance, targetUUID: string): Promise<void> {
    return axios.delete(`/${Resources.USERGROUP}`, {
        params: {targetUUID}
    })
        .then(handleSuccessResponse, handleErrorResponse);
}

export function leaveSuperStudyGroup(axios: AxiosInstance, targetUUID: string): Promise<void> {
    return axios.delete(`/${Resources.USERGROUP}`, {
        params: {targetUUID}
    })
        .then(handleSuccessResponse, handleErrorResponse);
}