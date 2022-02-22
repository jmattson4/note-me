<template>
    <div class="columns is-gapless">
        <div
            :id="`display-column-${index}`"
            v-for="val, index in store.displayed"
            class="column"
            :key="index"
            style="min-height: 50px;"
            @drop="onDrop($event, index)"
            @dragenter.prevent
            @dragover.prevent
        >
            <NoteDisplay
                :note="store.getNote(note)"
                v-for="note, i in val"
                :key="i"
                :list-index="index"
                :index="i"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNoteStore } from '@/stores/note';
import NoteDisplay from './note-display.vue';

const store = useNoteStore()
const onDrop = (event: DragEvent, listIndex: number,) => {
    const name = event.dataTransfer?.getData('name')
    if (!name) {
        return
    }
    const index = traverseTree((event.target as HTMLElement))
    const prevListIndex = parseInt(event.dataTransfer!.getData('listIndex'))
    store.moveDisplayed(index, prevListIndex, listIndex, name!)
}

const traverseTree = (element: HTMLElement, shift = 0): number => {
    if (element) {
        switch (element.tagName) {
            case 'DIV':
                if (element.classList.contains("display")) {
                    return parseInt(element.getAttribute('data-id')!) + shift
                } else if(element.classList.contains("level")){
                    return traverseTree(element.parentElement!, -1)
                } else {
                    return traverseTree(element.parentElement!)
                }
            case 'HEADER': 
                return traverseTree(element.parentElement!, -1)
            case 'FOOTER':     
            case 'SECTION': 
                return traverseTree(element.parentElement!, 1)
            case 'SPAN':
            case 'BUTTON':
            case 'P': 
                return traverseTree(element.parentElement!)
            default:
                break;
        }
    }
    return 0
}
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