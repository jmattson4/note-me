<template>
    <div
        class="display tile box has-background-white-ter"
        :draggable="!isEditable ? 'false' : 'true'"
        :data-id="index"
        @dragstart="dragStart($event, note!)"
    >
        <header class="display-header level">
            <p class="display-title">{{ title }}</p>
            <div class="level">
                <span v-if="isEditable" @click="onEditSaveClick()" class="is-clickable">
                    <i class="fa-solid fa-pen-to-square has-color-blue"></i>
                </span>
                <span v-else @click="onEditSaveClick()" class="is-clickable">
                    <i class="fa-solid fa-save"></i>
                </span>
                <button
                    class="delete has-background-danger ml-2"
                    aria-label="close"
                    @click="onEditSaveClose()"
                ></button>
            </div>
        </header>
        <section class="display-body">
            <InputField
                v-if="!isEditable"
                type="textbox"
                v-model="note!.message"
                @keyup="onKeyup"
                :valid="true"
                :disabled="isEditable"
            />
            <pre v-else>{{store.getNoteMessageDisplay(note?.name ?? '')}}</pre>
        </section>
        <footer class="columns">
            <div class="column">
                <div class="is-flex is-flex-wrap-wrap">
                    <span class="tag is-link is-light is-clickable m-1" v-for="link in note?.linkedNotes" @click="onLinkClick()">{{ link }}</span>
                </div>
                <div class="is-flex">
                    <p class="column is-size-7">Created: {{ note?.created }}</p>
                    <p class="column is-size-7">Updated: {{ note?.updated }}</p>
                </div>
            </div>
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
    listIndex: Number,
    index: Number
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

const onLinkClick = () => {
    store.openLinks(props.note!)
}

const onKeyup = (keyUp: KeyboardEvent) => {
    if (keyUp.code === 'ControlLeft'){
        onEditSaveClick()
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
    .display-header {
        display: flex;
        justify-content: space-between;
    }
}
</style>