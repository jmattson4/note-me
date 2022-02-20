<template>
    <div class="display" draggable="true" @dragstart="dragStart($event, note!)">
        <header class="display-header">
            <p class="display-title">{{ title }}</p>
            <div>
                <button
                    class="is-info"
                    style="margin-right: 2vw;"
                    :aria-label="isEditable ? 'edit' : 'save'"
                    @click="onEditSaveClick()"
                >{{ isEditable ? 'Edit' : 'Save' }}</button>
                <button class="delete" aria-label="close" @click="onEditSaveClose()"></button>
            </div>
        </header>
        <section class="display-body">
            <InputField
                type="textbox"
                v-model="note!.message"
                :valid="true"
                :disabled="isEditable"
            />
        </section>
        <footer class="display-footer columns">
            <p class="column">Created {{ note?.created }}</p>
            <p class="column">Updated {{ note?.updated }}</p>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import type { Note } from '@/models/Note'
import InputField from './input-field.vue';
import { useNoteStore } from '@/stores/note';
const props = defineProps({
    note: Object as PropType<Note>,
    listIndex: Number
})
const store = useNoteStore()
const isEditable = ref(true)


const dragStart = (event: DragEvent, item: Note) => {
    event.dataTransfer!.effectAllowed = 'move'
    event.dataTransfer!.dropEffect = 'move'
    event.dataTransfer!.setData('name', item.name)
    event.dataTransfer!.setData('listIndex', `${props.listIndex!}`)
}

const title = computed(() => {
    if (props.note?.groupName != "") {
        return `${props.note?.name} -- ${props.note?.groupName}`
    } else {
        return `${props.note?.name}`
    }
})

const onEditSaveClick = () => {
    if (isEditable.value) {
        isEditable.value = false
    } else {
        store.updateNote(props.note!)
        isEditable.value = true
    }
}

const onEditSaveClose = () => {
    if (!isEditable.value) {
        isEditable.value = true
    } else {
        store.deleteNote(props.note!.name)
        isEditable.value = true
    }
}
</script>

<style lang="scss">
.display {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    column-gap: 10px;
    margin: 2vh 2vw;
    background-color: white;
    .display-header {
        display: flex;
        justify-content: space-around;
    }
    .display-footer {
        display: flex;
        justify-content: space-around;
    }
}
</style>