export type ModuleDto = {
    name: string;
}

export type UserModule = {
    name: string;
    chapter: Chapter[];
}

export type  Checkbox = {
    id: string;
    text: string;
    checked: boolean;
}

export type  Chapter = {
    id: string;
    title: string;
    checkboxes: Checkbox[];
}
