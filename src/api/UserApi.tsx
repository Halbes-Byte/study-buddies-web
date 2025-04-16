import {AxiosInstance} from "axios";
import {Resources} from "../App";
import {handleErrorResponse, handleSuccessResponse} from "./ErrorHandling";
import {UserDto} from "../dtos/UserDto";

export function getUser(axios: AxiosInstance): Promise<UserDto> {
    return axios.get(Resources.USER)
        .then(res => res.data[0], handleErrorResponse);
}

export function updateUsername(axios: AxiosInstance, name: string) {
    return axios.post(Resources.USER, {username: name})
        .then(handleSuccessResponse, handleErrorResponse);
}