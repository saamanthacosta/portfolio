<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

interface BaseInputProps {
  modelValue?: string | number
  label: string
  type?: InputType
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  autocomplete?: string
  inputmode?: 'text' | 'numeric' | 'decimal' | 'email' | 'tel' | 'url' | 'search'
  id?: string
  name?: string
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  modelValue: '',
  type: 'text',
  hint: undefined,
  error: undefined,
  required: false,
  disabled: false,
  placeholder: undefined,
  autocomplete: undefined,
  inputmode: undefined,
  id: undefined,
  name: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const attrs = useAttrs()
const autoId = useId()
const inputId = computed(() => props.id ?? `base-input-${autoId}`)
const hintId = computed(() => `${inputId.value}-hint`)
const errorId = computed(() => `${inputId.value}-error`)
const describedBy = computed(() => {
  const ids: string[] = []
  if (props.hint) ids.push(hintId.value)
  if (props.error) ids.push(errorId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const isInvalid = computed(() => Boolean(props.error))

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const inputClasses = computed<string>(() => {
  const base =
    'w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-musgo-500 focus:border-transparent'
  if (isInvalid.value) {
    return `${base} border-pink-500 dark:border-pink-400`
  }
  return `${base} border-zinc-200 dark:border-zinc-700`
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      :for="inputId"
      class="text-sm font-medium text-zinc-700 dark:text-zinc-200"
    >
      {{ props.label }}
      <span v-if="props.required" class="text-pink-500" aria-hidden="true">*</span>
    </label>
    <input
      :id="inputId"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :required="props.required"
      :disabled="props.disabled"
      :autocomplete="props.autocomplete"
      :inputmode="props.inputmode"
      :name="props.name"
      :aria-invalid="isInvalid ? 'true' : undefined"
      :aria-describedby="describedBy"
      :aria-required="props.required ? 'true' : undefined"
      :class="inputClasses"
      v-bind="attrs"
      @input="onInput"
      @blur="(event) => emit('blur', event)"
      @focus="(event) => emit('focus', event)"
    />
    <p
      v-if="props.hint && !props.error"
      :id="hintId"
      class="text-xs text-zinc-500 dark:text-zinc-400"
    >
      {{ props.hint }}
    </p>
    <p
      v-if="props.error"
      :id="errorId"
      class="text-xs text-pink-600 dark:text-pink-400"
      role="alert"
    >
      {{ props.error }}
    </p>
  </div>
</template>
