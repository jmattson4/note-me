import type { Note, NoteMap } from '@/models/Note'
import { defineStore } from 'pinia'


interface NoteStore {
    notes: NoteMap
}

export const useNoteStore = defineStore({
  id: 'notes',
  state: () => ({
    notes: {}
  } as NoteStore),
  getters: {
      getNote(state): (name: string) => Note {
        return function(name: string): Note {
            return state.notes[name]
        }
      }
  },
  actions: {
    createNote(note: Note) {
      this.notes[note.name] = note
    }
  }
})