import {AxiosError, AxiosResponse} from "axios";

export function handleSuccessResponse(response: AxiosResponse): Promise<any> {
    return Promise.resolve(response.data);
}

export function handleErrorResponse(error: AxiosError): Promise<any> {
        throw new Error(error.message);
}
