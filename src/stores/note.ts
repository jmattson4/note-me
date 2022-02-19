import type { Note, NoteMap } from '@/models/Note'
import { defineStore } from 'pinia'


interface NoteStore {
    notes: NoteMap
    groups: string[]
}

export const useNoteStore = defineStore({
  id: 'notes',
  state: () => ({
    notes: {},
    groups: []
  } as NoteStore),
  getters: {
      getNote(state): (name: string) => Note {
        return function(name: string): Note {
            return state.notes[name]
        }
      },
  },
  actions: {
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