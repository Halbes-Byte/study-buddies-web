import {UserModule} from "./ModuleDto";

export type UserDto = {
    username: string;
    uuid: string;
    modules: UserModule[];
}