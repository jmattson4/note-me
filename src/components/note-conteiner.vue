<template>
    <div class="columns">
        <div
            :id="`display-column-${index}`"
            v-for="val, index in localArray"
            class="column is-one-third"
            :key="index"
            style="min-height: 50px;"
            @drop="onDrop($event, index)"
            @dragenter.prevent
            @dragover.prevent
        >
            <NoteDisplay
                :note="note"
                v-for="note in val"
                :key="note.name"
                :list-index="index"
                :data-id="note.name"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Note } from '@/models/Note';
import { useNoteStore } from '@/stores/note';
import NoteDisplay from './note-display.vue';
import { ref, watch } from 'vue';

const store = useNoteStore()

const onDrop = (event: DragEvent, listIndex: number,) => {
    const name = event.dataTransfer?.getData('name')
    const prevListIndex = parseInt(event.dataTransfer!.getData('listIndex'))
    const item = localArray.value[prevListIndex].find(item => item.name == name)
    if (!item) {
        return
    }
    localArray.value[prevListIndex] = localArray.value[prevListIndex].filter(x => x.name !== name)
    localArray.value[listIndex].push(item)
}

const splitResults = (notes: Note[]) => {
    let chunks = [], i = 0, n = notes.length
    let len = notes.length / 3
    while (i < n) {
        chunks.push(notes.slice(i, i += len))
    }
    return chunks
}
const localArray = ref<Note[][]>(splitResults(store.searchResults))

watch(() => store.searchResults, (newVal) => {
    localArray.value = splitResults(newVal)
})

</script>

<style lang="scss">
.flex-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    .note {
        display: flex;
        flex-direction: column;
        width: 45%;
    }
}
</style>