import {AxiosInstance} from "axios";
import {Resources} from "../App";
import {handleErrorResponse, handleSuccessResponse} from "./ErrorHandling";
import {UserDto} from "../dtos/UserDto";
import {UserModule} from "../dtos/ModuleDto";

export function getUser(axios: AxiosInstance): Promise<UserDto> {
    return axios.get(Resources.USER)
        .then(res => res.data[0], handleErrorResponse);
}

export function updateUsername(axios: AxiosInstance, name: string) {
    return axios.post(Resources.USER, {username: name})
        .then(handleSuccessResponse, handleErrorResponse);
}

export function updateUserModules(axios: AxiosInstance, modules: UserModule[]) {
    return axios.put(Resources.USER, modules)
        .then(handleSuccessResponse, handleErrorResponse);
}