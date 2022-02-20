<template>
    <Button type="is-primary" @click="modalCloser()">Create Note</Button>
    <Modal
        :is-open="isModalOpen"
        @close="modalCloser()"
        title="Create Note"
        @success="submit()"
        :sucess-disabled="isSubmitting"
    >
        <template v-slot:body>
            <InputField
                type="input"
                label="Name"
                placeholder="Note Name"
                v-model="name"
                :valid="!nameError"
                :invalid-message="nameError"
            />
            <!-- <InputField
                type="dropdown"
                label="Group Name"
                placeholder="Group Name"
                v-model="groupName"
                :valid="true"
                :drop-down-content
            /> -->
            <DropDown label="Group Name" v-model="groupName" :drop-down-content="noteStore.groups" />
            <InputField
                type="textbox"
                label="Message"
                placeholder="Enter a Note"
                v-model="message"
                :valid="!messageError"
                :invalid-message="messageError"
            />
        </template>
        <template v-slot:success>Create</template>
    </Modal>
</template>

<script setup lang="ts">
import Button from '@/components/button.vue';
import Modal from '../components/modal.vue';
import InputField from './input-field.vue';
import DropDown from './dropdown-search.vue';
import { useForm, useField } from 'vee-validate';
import { noteSchema, type Note } from '@/models/Note'
import { ref } from 'vue';
import { useNoteStore } from '@/stores/note';
import { randomUUID } from 'crypto';

const noteStore = useNoteStore()

const isModalOpen = ref(false)

const modalCloser = () => {
    isModalOpen.value = !isModalOpen.value
}

const { setErrors, handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: noteSchema,
})

const submit = handleSubmit((n) => {
    if (noteStore.getNote(n.name ?? '')) {
        setErrors({
            name: 'Note Name is already taken.',
        })
        return
    }
    const note: Note = {
        name: n.name ?? '',
        message: n.message ?? '',
        groupName: n.groupName ?? '',
        created: '',
        updated: '',
        linkedNotes: []
    }
    noteStore.createNote(note)
    resetForm()
    modalCloser()
})

setErrors({
    name: 'Please enter a name',
    message: 'Please enter a note'
})

const { value: name, errorMessage: nameError } = useField<string>('name');
const { value: groupName } = useField<string>('groupName');
const { value: message, errorMessage: messageError } = useField<string>('message');
</script>
