<template>
    <DropdownSearch
        style="width: 80%; height: 100%"
        place-holder="Search For Notes"
        v-model="store.searchValue"
        :drop-down-content="store.searchSuggestions"
        @keydown="handleKeyup"
    ></DropdownSearch>
</template>

<script setup lang="ts">
import { useNoteStore } from "@/stores/note";
import DropdownSearch from "./dropdown-search.vue";
const store = useNoteStore()

const handleKeyup = (event: KeyboardEvent) => {
    console.log(event.key)
    if (event.key === 'Enter') {
        console.log('fired');
        store.splitResults(store.searchResults)
    }
}

</script>
