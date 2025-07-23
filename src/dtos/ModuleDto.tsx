export type UserModule = {
    name: string;
    examDate: string;
    examLoc: string | undefined;
    examTime: string;
    chapter: Chapter[];
}

export type Checkbox = {
    id: string;
    title: string;
    checked: boolean;
}

export type Chapter = {
    id: number;
    title: string;
    checkbox: Checkbox[];
}
