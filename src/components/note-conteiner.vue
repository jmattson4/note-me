<template>
        <draggable
          v-model="localArray"
          :group="{}"
        >
          <template #item="{ element }">
            <NoteDisplay :note="element">
            </NoteDisplay>
          </template>
        </draggable>
</template>

<script setup lang="ts">
import { useNoteStore } from '@/stores/note';
import NoteDisplay from './note-display.vue';
import draggable from 'vuedraggable'
import { ref, watch } from 'vue';

const store = useNoteStore()

const localArray = ref(store.searchResults)
watch(() => store.searchResults, (newVal) => {
    localArray.value = newVal
})

</script>
