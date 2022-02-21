<template>
    <div>
        <DropdownButton label="Action" style="height: 100%;">
            <template v-slot:dropdown-content>
                <a
                    class="dropdown-item has-background-black"
                    @click="isCreateNoteOpen = true"
                >Create Note</a>
                <a
                    class="dropdown-item has-background-black"
                    @click="isSaveDisplayOpen = true"
                >Save Space</a>
                <a
                    class="dropdown-item has-background-black"
                    @click="isLoadDisplayOpen = true"
                >Load Space</a>
            </template>
        </DropdownButton>
        <CreateNoteModal :is-modal-open="isCreateNoteOpen" @close="isCreateNoteOpen = false" />
        <SaveDisplayModal :is-modal-open="isSaveDisplayOpen" @close="isSaveDisplayOpen = false" />
        <LoadDisplayModal :is-modal-open="isLoadDisplayOpen" @close="isLoadDisplayOpen = false" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DropdownButton from './dropdown-button.vue';
import CreateNoteModal from './create-note-modal.vue';
import SaveDisplayModal from './save-display-modal.vue';
import LoadDisplayModal from './load-display-modal.vue';

const isCreateNoteOpen = ref(false)
const isSaveDisplayOpen = ref(false);
const isLoadDisplayOpen = ref(false);
</script>
