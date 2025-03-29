import {AxiosInstance} from "axios";
import {Resources} from "../App";
import {handleErrorResponse, handleSuccessResponse} from "./ErrorHandling";

export function getUser(axios: AxiosInstance) {
    return axios.get(`${Resources.USER}`)
        .then(handleSuccessResponse, handleErrorResponse);
}