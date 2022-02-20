<template>
    <DropdownSearch
        style="width: 100%;"
        place-holder="Search For Notes"
        v-model="selectedSearchValue"
        :drop-down-content="[]"
    ></DropdownSearch>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DropdownSearch from "./dropdown-search.vue";
const selectedSearchValue = ref("")
</script>
