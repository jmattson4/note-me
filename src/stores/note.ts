import type { Note, NoteMap } from '@/models/Note'
import { defineStore } from 'pinia'
import { object } from 'yup/lib/locale'


interface NoteStore {
  notes: NoteMap
  groups: string[],
  searchValue: string
}

export const useNoteStore = defineStore({
  id: 'notes',
  state: () => ({
    notes: {},
    groups: []
  } as NoteStore),
  getters: {
    getNote(state): (name: string) => Note {
      return function (name: string): Note {
        return state.notes[name]
      }
    },
    searchResults(state): Note[] {
      let results: Note[] = []
      Object.keys(state.notes).forEach(key =>{
        if (key.includes(state.searchValue) || state.notes[key]?.groupName == state.searchValue) {
          results.push(state.notes[key])
        }
      } )
      console.log(results)
      return results
    }
  },
  actions: {
    updateSearchValue(search: string) {
      this.searchValue = search
    },
    createNote(note: Note) {
      this.addGroup(note.groupName)
      this.notes[note.name] = note
    },
    addGroup(groupName: string) {
      if (!this.groups.includes(groupName)) {
        this.groups.push(groupName)
      }
    }
  }
})