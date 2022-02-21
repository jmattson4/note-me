<template>
    <Modal
        :model-value="isModalOpen"
        title="Load Space"
        @update:model-value="$emit('close')"
        @success="submit()"
    >
        <template v-slot:body>
            <DropdownSearch
                type="input"
                label="Space Name"
                class="mb-5"
                placeholder="Space Name"
                v-model="noteStore.spaceSearchValue"
                :valid="noteStore.spaceSearchValue"
                :drop-down-content="noteStore.existingDisplays"
            />
        </template>
        <template v-slot:success>Load</template>
    </Modal>
</template>

<script setup lang="ts">
import DropdownSearch from "./dropdown-search.vue";
import Modal from "./modal.vue";
import { useNoteStore } from '@/stores/note';
import { watch } from "vue";
const noteStore = useNoteStore()
const props = defineProps({
    isModalOpen: Boolean
})
const emit = defineEmits(['close'])

const submit = () => {
    noteStore.loadDisplay()
    emit('close')
}
watch(() => props.isModalOpen, (nv) => {
    if (nv) {
        noteStore.spaceSearchValue = ''
    }
})
</script>
