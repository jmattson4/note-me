import type { Note, NoteMap } from '@/models/Note'
import { defineStore } from 'pinia'

interface NoteStore {
  notes: NoteMap
  groups: string[],
  searchValue: string,
  displayed: Note[][]
}

export const useNoteStore = defineStore({
  id: 'notes',
  state: () => ({
    notes: {},
    groups: [],
    displayed: [],
  } as NoteStore),
  getters: {
    getNote(state): (name: string) => Note {
      return function (name: string): Note {
        return state.notes[name]
      }
    },
    searchSuggestions(state): string[] {
      let results: string[] = []
      Object.keys(state.notes).forEach(key =>{
        if (key.includes(state.searchValue) || state.notes[key]?.groupName.includes(state.searchValue)) {
          results.push(state.notes[key].name)
        }
      } )
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
        Object.keys(state.notes).forEach(key =>{
          if (key.includes(search) || state.notes[key]?.groupName.includes(search)) {
            results.push(state.notes[key])
          }
        } )
        return results
      }
    }
  },
  actions: {
    updateSearchValue(search: string) {
      if (search) {
        console.log('Searched updated')
        this.searchValue = search
      }
    },
    createNote(note: Note) {
      this.addGroup(note.groupName)
      this.notes[note.name] = note
    },
    updateNote(note: Note) {
      const n = this.getNote(note.name)
      if (n) {
        const date = new Date()
        n.updated = date.toLocaleDateString() + " " + date.toLocaleTimeString()
        this.createNote(note)
      }
    },
    deleteNote(noteName: string) {
      delete this.notes[noteName]
    },
    addGroup(groupName: string) {
      if (!this.groups.includes(groupName)) {
        this.groups.push(groupName)
      }
    },
    splitResults(notes: Note[], splitSize: number = 3) {
      let chunks = [], i = 0, n = notes.length
      let len = notes.length / splitSize
      while (i < n) {
          chunks.push(notes.slice(i, i += len))
      }
      this.displayed = chunks
    },
    moveDisplayed(index:number, prevListIndex: number, newListIndex: number, name: string) {
      const item = this.displayed[prevListIndex].find(item => item.name == name)
      if (!item) {
          return
      }
      console.log(index)
      this.displayed[prevListIndex] = this.displayed[prevListIndex].filter(x => x.name !== name)
      this.displayed[newListIndex].splice(index, 0, item)
    }
  }
})