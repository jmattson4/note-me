<template>
    <div class="field is-flex">
        <label class="label">{{ label }}</label>
        <div class="control" style="width:100%">
            <div class="dropdown" style="width: 100%;" :class="isActive ? 'is-active' : ''">
                <div class="dropdown-trigger" style="width: 100%;">
                    <input
                        aria-haspopup="true"
                        aria-controls="dropdown-menu3"
                        class="input"
                        type="text"
                        :value="modelValue"
                        :placeholder="placeHolder"
                        @blur="timeTrigger(false)"
                        @click="isActive = true"
                        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                    />
                </div>
                <div class="dropdown-menu" id="dropdown-menu3" role="menu" style="width: 100%;">
                    <div class="dropdown-content">
                        <a
                            v-for="content in dropDownContent"
                            href="#"
                            @click="onClick"
                            class="dropdown-item"
                        >{{ content }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
defineProps({
    label: String,
    modelValue: String,
    dropDownContent: Array as PropType<String[]>,
    placeHolder: String
})
const emit = defineEmits(["update:modelValue"])
const isActive = ref(false)
const timeTrigger = (active: boolean) => {
    setTimeout(() => isActive.value = active, 100)
}
const onClick = (event: Event) => {
    const text = (event.target as HTMLAnchorElement).text
    emit('update:modelValue', text)
}
</script>
