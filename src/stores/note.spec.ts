import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNoteStore } from './note'
import type { Note } from '@/models/Note'

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('Test createNote', () => {
    const noteStore = useNoteStore()
    const note: Note = {name: "test1", created: "2021-02-11", updated: "2021-02-11", message: "Test123", groupName: "", linkedNotes: []}
    noteStore.createNote(note)
    expect(noteStore.notes[note.name]).eql(note)
    expect(noteStore.groups[0]).toBe("")
  })

  it('Test getNote', () => {
    const noteStore = useNoteStore()
    const note: Note = {name: "test1", created: "2021-02-11", updated: "2021-02-11", message: "Test123", groupName: "", linkedNotes: []}
    noteStore.createNote(note)
    expect(noteStore.getNote(note.name)).eql(note)
  })

  it('Test searchResults', () => {
    const noteStore = useNoteStore()
    const note: Note = {name: "test", created: "2021-02-11", updated: "2021-02-11", message: "Test123", groupName: "", linkedNotes: []}
    const note2: Note = {name: "test2", created: "2021-02-11", updated: "2021-02-11", message: "Test123", groupName: "1", linkedNotes: []}
    const note3: Note = {name: "test3", created: "2021-02-11", updated: "2021-02-11", message: "Test123", groupName: "1", linkedNotes: []}
    noteStore.createNote(note)
    noteStore.createNote(note2)
    noteStore.createNote(note3)
    noteStore.updateSearchValue("1")
    expect(noteStore.searchResults).eql([note2, note3])
  })
})