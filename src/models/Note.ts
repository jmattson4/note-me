import { object, string, date } from 'yup';
export interface Note {
    name: string,
    message:string,
    created: string,
    updated: string
    groupName: string,
    linkedNotes: Note[]
}

export interface NoteMap {
    [key: string]: Note
}

export const noteSchema = object({
    name: string().required("Name is a required field."),
    message: string().required("Message is a required field."),
    created: date().default(() => new Date()),
    updated: date().default(() => new Date()),
    groupName: string().notRequired()
})