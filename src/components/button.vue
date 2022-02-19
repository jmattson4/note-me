<template>
 <button class="button" :class="type" @click="$emit('click')"><slot></slot></button>
</template>

<script setup lang="ts">
defineProps({
    type: String
})
defineEmits(["click"])
</script>
