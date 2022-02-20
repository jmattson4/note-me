<template>
    <DropdownSearch
        style="width: 100%;"
        place-holder="Search For Notes"
        v-model="store.searchValue"
        :drop-down-content="store.searchSuggestions"
    ></DropdownSearch>
</template>

<script setup lang="ts">
import { useNoteStore } from "@/stores/note";
import DropdownSearch from "./dropdown-search.vue";
const store = useNoteStore()
</script>
