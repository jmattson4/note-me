<template>
    <div class="modal" :class="modelValue ? 'is-active' : ''">
        <div class="modal-background">
            <slot name="background"></slot>
        </div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ title }}</p>
                <button class="delete" aria-label="close" @click="$emit('update:modelValue', false)"></button>
            </header>
            <section class="modal-card-body">
                <slot name="body"></slot>
            </section>
            <footer class="modal-card-foot columns">
                <button class="button column" @click="$emit('update:modelValue', false)">
                    <slot name="close">Close</slot>
                </button>
                <button class="button is-success column" @click="$emit('success')" :disabled="sucessDisabled">
                    <slot name="success">Success</slot>
                </button>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: String,
    modelValue: Boolean,
    sucessDisabled: Boolean,
})
defineEmits(["success", 'update:modelValue'])
</script>
