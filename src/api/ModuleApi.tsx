import {AxiosInstance} from "axios";
import {Resources} from "../App";
import {handleErrorResponse, handleSuccessResponse} from "./ErrorHandling";
import {ModuleDto} from "../dtos/ModuleDto";

export function getModules(axios: AxiosInstance): Promise<ModuleDto[]> {
    const url = `/${Resources.MODULES}`;
    return axios.get(url)
        .then(handleSuccessResponse, handleErrorResponse);
}

export function createModule(axios: AxiosInstance, moduleName: string) {
    const url = `/${Resources.MODULES}`;
    axios.post(url, {name: moduleName})
        .then(handleSuccessResponse, handleErrorResponse);
}