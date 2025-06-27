import {AxiosInstance} from "axios";
import {Resources} from "../App";
import {handleErrorResponse, handleSuccessResponse} from "./ErrorHandling";
import {UserModule} from "../dtos/ModuleDto";

export function getModules(axios: AxiosInstance): Promise<UserModule[]> {
    const url = `/${Resources.MODULES}`;
    return axios.get(url)
        .then(handleSuccessResponse, handleErrorResponse);
}

export function createModule(axios: AxiosInstance, moduleName: string) {
    const url = `/${Resources.MODULES}`;
    axios.post(url, {name: moduleName})
        .then(handleSuccessResponse, handleErrorResponse);
}

//TODO HANDLE TOGGLE FUNCTION. WHAT ENDPOINT TO USE? ASK BACKEND
export function toggleCheckbox(axios: AxiosInstance) {
    const url = `/${Resources.CHECKBOX}`;
    axios.put(url)
        .then(handleSuccessResponse, handleErrorResponse);
}