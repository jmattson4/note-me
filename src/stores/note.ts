import type { Note, NoteMap } from '@/models/Note'
import { linksFromString, replaceLinksForDisplay } from '@/service/linker'
import { remove } from '@vue/shared'
import { defineStore } from 'pinia'

type Space = Note[][]

interface Spaces {
  [name: string]: Space
}

interface NoteStore {
  notes: NoteMap
  groups: string[],
  searchValue: string,
  displayed: Space,
  spaces: Spaces,
  selectedSpace: string,
  spaceSearchValue: string,
  columnSize: number
}

const getDateTime = (): string => {
  const date = new Date()
  return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

export const useNoteStore = defineStore({
  id: 'notes',
  state: () => ({
    notes: {},
    groups: [],
    displayed: [],
    spaces: {},
    selectedSpace: '',
    spaceSearchValue: '',
    columnSize: 4
  } as NoteStore),
  getters: {
    getNote(state): (name: string) => Note {
      return function (name: string): Note {
        return state.notes[name]
      }
    },
    getNoteMessageDisplay(state): (name: string) => string {
      return function (name: string): string {
        return replaceLinksForDisplay(state.notes[name]?.message ?? '')
      }
    },
    searchSuggestions(state): string[] {
      let results: string[] = []
      Object.keys(state.notes).forEach(key => {
        if (key.includes(state.searchValue) || state.notes[key]?.groupName.includes(state.searchValue)) {
          results.push(state.notes[key].name)
        }
      })
      return results
    },
    searchResults(state): Note[] {
      if (state.searchValue) {
        let results: Note[] = []
        let search = state.searchValue
        switch (search) {
          case "all":
            search = ""
            break
          default:
            break
        }
        Object.keys(state.notes).forEach(key => {
          if (key.includes(search) || state.notes[key]?.groupName.includes(search)) {
            results.push(state.notes[key])
          }
        })
        return results
      }
    },
    existingDisplays(state): string[] {
      return Object.keys(state.spaces).filter(x => x.includes(state.spaceSearchValue))
    }
  },
  actions: {
    updateSearchValue(search: string) {
      if (search) {
        this.searchValue = search
      }
    },
    createNote(note: Note) {
      note.created = getDateTime()
      note.updated = getDateTime()
      this.addGroup(note.groupName)
      note.linkedNotes = this.link(note.message)
      this.notes[note.name] = note
      this.displayed[0].splice(0, 0, note)
    },
    updateNote(note: Note) {
      let n = this.getNote(note.name)
      if (n) {
        n = note;
        n.updated = getDateTime()
        n.linkedNotes = this.link(note.message)
        this.notes[n.name] = n
      }
    },
    deleteNote(noteName: string) {
      //remove note from spaces
      Object.keys(this.spaces).forEach(x => {
        this.spaces[x].forEach((y, i) => {
          const index = y.findIndex(z => z.name === noteName)
          if (index !== -1) {
            if (this.spaces[x][i]) {
              this.spaces[x][i].splice(index, 1)
            }
          }
        })
      })
      //remove from currently displayed.
      this.displayed.forEach((_, i) => {
        const index = this.displayed[i].findIndex(z => z.name === noteName)
        if (index !== -1) {
          this.displayed[i].splice(index, 1)
        }
      })
      //remove from notes.
      delete this.notes[noteName]
    },
    addGroup(groupName: string) {
      if (!this.groups.includes(groupName)) {
        this.groups.push(groupName)
      }
    },
    link(noteMessage: string): string[] {
      return linksFromString(noteMessage, this.notes)
    },
    openLinks(parentNote: Note) {
      let newDisplayed: Note[][] = []
      for (let index = 0; index < this.columnSize; index++) {
        newDisplayed.push([])
      }
      newDisplayed[0].push(parentNote)
      let columnPut = 1
      for (const key in parentNote.linkedNotes) {
        const note = this.notes[parentNote.linkedNotes[key]]
        if (note) {
          newDisplayed[columnPut].push(note)
          if (columnPut == this.columnSize - 1) {
            columnPut = 1
          } else {
            columnPut++
          }
        }
      }
      this.displayed = newDisplayed
    },
    splitResults(notes: Note[]) {
      let chunks = [], i = 0, n = notes.length
      let len = notes.length / this.columnSize
      while (i < n) {
        chunks.push(notes.slice(i, i += len))
      }
      this.displayed = chunks
    },
    moveDisplayed(index: number, prevListIndex: number, newListIndex: number, name: string) {
      const item = this.displayed[prevListIndex].find(item => item.name == name)
      if (!item) {
        return
      }
      this.displayed[prevListIndex] = this.displayed[prevListIndex].filter(x => x.name !== name)
      this.displayed[newListIndex].splice(index, 0, item)
    },
    saveDisplay(name: string) {
      this.spaces[name] = this.displayed
    },
    loadDisplay() {
      const sd = this.spaces[this.spaceSearchValue]
      if (sd) {
        this.selectedSpace = this.spaceSearchValue;
        this.displayed = sd
      }
    }
  }
})