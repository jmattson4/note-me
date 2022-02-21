<template>
    <div>
        <Modal
            :model-value="isModalOpen"
            title="Create Note"
            @update:model-value="$emit('close')"
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
                <DropDown
                    label="Group Name"
                    v-model="groupName"
                    :drop-down-content="noteStore.groups"
                />
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
    </div>
</template>

<script setup lang="ts">
import Modal from './modal.vue';
import InputField from './input-field.vue';
import DropDown from './dropdown-search.vue';
import { useForm, useField } from 'vee-validate';
import { noteSchema, type Note } from '@/models/Note'
import { onMounted } from 'vue';
import { useNoteStore } from '@/stores/note';

const noteStore = useNoteStore()

defineProps({
    isModalOpen: Boolean
})
const emit = defineEmits(['close'])

const { setErrors, handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: noteSchema,
})
const { value: name, errorMessage: nameError } = useField<string>('name');
const { value: groupName } = useField<string>('groupName');
const { value: message, errorMessage: messageError } = useField<string>('message');

const reset = () => {
    resetForm()
    setErrors({
        name: 'Please enter a name',
        message: 'Please enter a note'
    })
}

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
    reset()
    emit('close')
})

onMounted(() => {
    reset()
})
</script>
