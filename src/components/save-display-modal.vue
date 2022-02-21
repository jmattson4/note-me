<template>
    <Modal
        :model-value="isModalOpen"
        title="Save Display"
        @update:model-value="$emit('close')"
        @success="submit()"
        :sucess-disabled="isSubmitting"
    >
        <template v-slot:body>
            <InputField
                type="input"
                label="Display Name"
                placeholder="Display Name"
                v-model="displayName"
                :valid="!nameError"
                :invalid-message="nameError"
            />
        </template>
        <template v-slot:success>Save</template>
    </Modal>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { useNoteStore } from '@/stores/note';
import InputField from './input-field.vue';
import { object, string } from 'yup';
import { onMounted } from 'vue';
import Modal from './modal.vue';
const noteStore = useNoteStore()

defineProps({
    isModalOpen: Boolean
})
const emit = defineEmits(['close'])

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: object({
        displayName: string().required('Please enter a display name.')
    }),
    initialValues: {
        displayName: noteStore.selectedDisplay
    }
})
const { value: displayName, errorMessage: nameError } = useField<string>('displayName');

const reset = () => {
    setValues({
        displayName: noteStore.selectedDisplay
    })
}
const submit = handleSubmit((f) => {
    noteStore.saveDisplay(f.displayName!)
    emit('close')
    reset()
})


onMounted(() => reset())
</script>
