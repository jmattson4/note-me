<template>
    <div class="dropdown" :class="classes" @focusout="onFocusOut()">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="$emit('click'); isActive = !isActive">
                <span>{{label}}</span>
                <span class="icon is-small">
                    <i :class="`fas fa-angle-${direction}`" aria-hidden="true"></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <slot name="dropdown-content"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';

type Direction = 'up' | 'down'
const props = defineProps({
    label: String,
    direction: String as PropType<Direction>
})
defineEmits(['click'])

const isActive = ref(false)

const onFocusOut = () => {
    setTimeout(() => isActive.value = false, 100)
}

const classes = computed(() => {
    const isUp = props.direction == 'up' ? 'is-up' : ''
    const active = isActive.value ? 'is-active' : ''
    return `${isUp} ${active}`

})
</script>
