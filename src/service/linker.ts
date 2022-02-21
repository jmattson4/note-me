import type { NoteMap } from "@/models/Note";



export const linksFromString = (message: string, notes: NoteMap) => {
    const regexp = /\{([^}]+)\}/g
    const links =  message.match(regexp)
    let linkedNotes: string[] = []
    if (!links || links.length <= 0) {
        return linkedNotes
    }
    links.forEach( x => {
        const stripped = x.slice(1, x.length - 1)
        const exists = notes[stripped]
        if (exists) {
            linkedNotes.push(exists.name)
        }
    })
    return linkedNotes
}

export const replaceLinksForDisplay = (message:string): string => {
    const regexp = /\{([^}]+)\}/g
    return  message.replace(regexp, "").trim()
}