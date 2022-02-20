<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ title }}</p>
            <button
                class="is-info"
                style="margin-right: 2vw;"
                :aria-label="isEditable ? 'edit' : 'save'"
                @click="onEditSaveClick()"
            >{{isEditable ? 'Edit' : 'Save'}}</button>
            <button class="delete" aria-label="close" @click="onEditSaveClose()"></button>
        </header>
        <section class="modal-card-body">
            <InputField type="textbox" v-model="note!.message" :valid="true" :disabled="isEditable" />
        </section>
        <footer class="modal-card-footer columns">
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
    note: Object as PropType<Note>
})
const store = useNoteStore()
const isEditable = ref(true)

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
