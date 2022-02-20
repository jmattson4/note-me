import { NoteMap } from '@/models/Note'
import {v4} from 'uuid'
import { describe, it, expect } from 'vitest'
import { linksFromString } from './linker'

describe('Counter Store', () => {
    it('Test linkFromString', () => {
        const noteMap: NoteMap = {
            "test1": { name: "test1", created: "2021-02-11", updated: "2021-02-11", message: "Test123", groupName: "", linkedNotes: []},
            "test2": { name: "test2", created: "2021-02-11", updated: "2021-02-11", message: "Test123", groupName: "", linkedNotes: []}
        }
        const links = linksFromString(`This is a test {test1} {test2}`, noteMap)
        expect(links).eql(["test1", "test2"])
      })
})