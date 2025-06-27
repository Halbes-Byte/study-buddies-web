export type UserModule = {
    name: string;
    chapter: Chapter[];
}

export type Checkbox = {
    id: number;
    title: string;
    checked: boolean;
}

export type Chapter = {
    id: number;
    title: string;
    checkbox: Checkbox[];
}
