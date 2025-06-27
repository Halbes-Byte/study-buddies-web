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
    const fullModules = addExamData(modules);
    return axios.put(Resources.USER, fullModules)
        .then(handleSuccessResponse, handleErrorResponse);
}

const addExamData = (userModules: UserModule[]) => {
    return userModules.map(userModule => ({
        ...userModule,
        examDate: "2025-08-20",
        examLoc: "loco",
    }));
};
