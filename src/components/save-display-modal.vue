<template>
    <Modal
        :model-value="isModalOpen"
        title="Save Space"
        @update:model-value="$emit('close')"
        @success="submit()"
        :sucess-disabled="isSubmitting"
    >
        <template v-slot:body>
            <InputField
                type="input"
                label="Space Name"
                placeholder="Space Name"
                v-model="spaceName"
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

const { handleSubmit, isSubmitting, setValues } = useForm({
    validationSchema: object({
        spaceName: string().required('Please enter a space name.')
    }),
    initialValues: {
        spaceName: noteStore.selectedSpace
    }
})
const { value: spaceName, errorMessage: nameError } = useField<string>('spaceName');

const reset = () => {
    setValues({
        spaceName: noteStore.selectedSpace
    })
}
const submit = handleSubmit((f) => {
    noteStore.saveDisplay(f.spaceName!)
    emit('close')
    reset()
})


onMounted(() => reset())
</script>
