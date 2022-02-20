import type { NoteMap, Note } from "@/models/Note";



export const linksFromString = (message: string, notes: NoteMap) => {
    const regexp = /\{([^}]+)\}/g
    const links =  message.match(regexp)
    let linkedNotes: string[] = []
    links.forEach( x => {
        const stripped = x.slice(1, x.length - 1)
        const exists = notes[stripped]
        if (exists) {
            linkedNotes.push(exists.name)
        }
    })
    return linkedNotes
}