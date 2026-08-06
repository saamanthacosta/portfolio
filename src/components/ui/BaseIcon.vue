<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface BaseIconProps {
  size?: IconSize | number
  decorative?: boolean
  label?: string
  title?: string
  strokeWidth?: number
}

const props = withDefaults(defineProps<BaseIconProps>(), {
  size: 'md',
  decorative: true,
  label: undefined,
  title: undefined,
  strokeWidth: 2,
})

const attrs = useAttrs()

const sizeClass = computed<string>(() => {
  if (typeof props.size === 'number') {
    return ''
  }
  switch (props.size) {
    case 'xs':
      return 'w-3 h-3'
    case 'sm':
      return 'w-4 h-4'
    case 'lg':
      return 'w-6 h-6'
    case 'xl':
      return 'w-8 h-8'
    case 'md':
    default:
      return 'w-5 h-5'
  }
})

const inlineStyle = computed<string>(() => {
  if (typeof props.size !== 'number') return ''
  return `width: ${props.size}px; height: ${props.size}px;`
})

const isDecorative = computed<boolean>(() => {
  return Boolean(props.decorative && !props.label && !props.title)
})

const ariaHidden = computed(() => (isDecorative.value ? 'true' : undefined))
const ariaRole = computed(() => (!isDecorative.value ? 'img' : undefined))
const ariaLabel = computed(() => (props.label ? props.label : undefined))
const titleId = `base-icon-${Math.random().toString(36).slice(2, 10)}`
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="props.strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="sizeClass"
    :style="inlineStyle"
    :aria-hidden="ariaHidden"
    :role="ariaRole"
    :aria-label="ariaLabel"
    v-bind="attrs"
  >
    <title v-if="!isDecorative && props.title" :id="titleId">{{ props.title }}</title>
    <slot />
  </svg>
</template>
