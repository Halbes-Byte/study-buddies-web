import {ModuleDto} from "./ModuleDto";

export type UserDto = {
    username: string;
    uuid: string;
    modules: ModuleDto[];
}