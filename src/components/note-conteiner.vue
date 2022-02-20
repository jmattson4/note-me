<template>
    <div class="columns">
        <div
            :id="`display-column-${index}`"
            v-for="val, index in store.displayed"
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
import { useNoteStore } from '@/stores/note';
import NoteDisplay from './note-display.vue';
import { watch } from 'vue';

const store = useNoteStore()

const onDrop = (event: DragEvent, listIndex: number,) => {
    const name = event.dataTransfer?.getData('name')
    if (!name){
        return
    }
    const prevListIndex = parseInt(event.dataTransfer!.getData('listIndex'))
    store.moveDisplayed(prevListIndex, listIndex, name!)
}

watch(() => store.searchResults, (newVal) => {
    console.log('fired')
    store.splitResults(newVal)
}, {deep: true})

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