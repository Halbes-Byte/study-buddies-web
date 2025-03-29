import {AxiosInstance} from "axios";
import {Resources} from "../App";
import {handleErrorResponse, handleSuccessResponse} from "./ErrorHandling";

export function getModules(axios: AxiosInstance): Promise<string[]> {
    const url = `/${Resources.MODULES}`;
    return axios.get(url)
        .then(handleSuccessResponse, handleErrorResponse);
}