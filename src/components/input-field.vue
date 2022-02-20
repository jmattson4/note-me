<template>
    <div class="field">
        <label class="label">{{ label }}</label>
        <div class="control">
            <input v-if="type === 'input'"
                class="input"
                :class="valid ? 'is-success' : 'is-danger'"
                type="text"
                :placeholder="placeholder"
                :value="modelValue"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            />
            <textarea
                v-if="type === 'textbox'"
                class="textarea"
                :class="valid ? 'is-success' : 'is-danger'"
                :placeholder="placeholder"
                :value="modelValue"
                @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
            ></textarea>

            <p v-if="valid" class="help is-success">{{ validMessage }}</p>
            <p v-else class="help is-danger">{{ invalidMessage }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
type InputType = "textbox" | "input" 
defineProps({
    label: String,
    placeholder: String,
    modelValue: String,
    valid: Boolean,
    invalidMessage: String,
    validMessage: String,
    type: String as PropType<InputType>,
    dropDownContent: Array as PropType<String[]>
})

defineEmits(["update:modelValue"])
</script>
