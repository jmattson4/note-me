<template>
    <DropdownSearch
        style="width: 100%; height: 100%;"
        place-holder="Search For Notes"
        v-model="store.searchValue"
        :drop-down-content="store.searchSuggestions"
        @keydown="handleKeyup"
        @update:modelValue="store.splitResults(store.searchResults!)"
    ></DropdownSearch>
</template>

<script setup lang="ts">
import { useNoteStore } from "@/stores/note";
import DropdownSearch from "./dropdown-search.vue";
const store = useNoteStore()

const handleKeyup = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        store.splitResults(store.searchResults!)
    }
}

</script>
