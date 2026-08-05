<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'

interface BaseToggleProps {
  modelValue: boolean
  label?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
}

const props = withDefaults(defineProps<BaseToggleProps>(), {
  label: undefined,
  disabled: false,
  required: false,
  name: undefined,
  id: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const attrs = useAttrs()
const autoId = useId()
const inputId = computed(() => props.id ?? `base-toggle-${autoId}`)

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}

const trackClasses = computed<string>(() => {
  const base = 'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150'
  if (props.disabled) {
    return `${base} bg-zinc-300 dark:bg-zinc-700 opacity-50 cursor-not-allowed`
  }
  if (props.modelValue) {
    return `${base} bg-musgo-500 cursor-pointer`
  }
  return `${base} bg-zinc-300 dark:bg-zinc-700 cursor-pointer`
})

const thumbClasses = computed<string>(() => {
  const base =
    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150'
  if (props.modelValue) {
    return `${base} translate-x-6`
  }
  return `${base} translate-x-1`
})
</script>

<template>
  <label :for="inputId" class="inline-flex items-center gap-3 cursor-pointer">
    <input
      :id="inputId"
      type="checkbox"
      role="switch"
      class="sr-only"
      :checked="props.modelValue"
      :disabled="props.disabled"
      :required="props.required"
      :name="props.name"
      :aria-label="props.label"
      v-bind="attrs"
      @change="onChange"
    />
    <span :class="trackClasses">
      <span :class="thumbClasses" />
    </span>
    <span
      v-if="props.label"
      class="text-sm font-medium text-zinc-700 dark:text-zinc-200"
    >
      {{ props.label }}
    </span>
  </label>
</template>
