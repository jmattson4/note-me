<template>
    <div class="dropdown" :class="isActive ? 'is-active' : ''" @focusout="onFocusOut()">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="$emit('click'); isActive = !isActive">
                <span>{{label}}</span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <slot name="dropdown-content"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps({
    label: String,
})
defineEmits(['click'])

const isActive = ref(false)

const onFocusOut = () => {
    setTimeout(() => isActive.value = false, 100)
}
</script>
