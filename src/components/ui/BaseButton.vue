<script setup lang="ts">
import { computed, useAttrs } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonElement = 'button' | 'a'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  element?: ButtonElement
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  href?: string
  target?: string
  rel?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  size: 'md',
  element: 'button',
  type: 'button',
  disabled: false,
  href: undefined,
  target: undefined,
  rel: undefined,
  ariaLabel: undefined,
})

const attrs = useAttrs()

const isLink = computed(() => props.element === 'a' || props.href !== undefined)

const variantClasses = computed<string>(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-musgo-500 hover:bg-musgo-600 text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200'
    case 'secondary':
      return 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-50 transition-colors duration-150'
    case 'ghost':
      return 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150'
    case 'icon':
      return 'rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-150'
  }
})

const sizeClasses = computed<string>(() => {
  if (props.variant === 'icon') {
    return 'w-11 h-11 flex items-center justify-center'
  }
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm'
    case 'lg':
      return 'px-8 py-4 text-base font-semibold'
    case 'md':
    default:
      return 'px-4 py-2.5 text-sm'
  }
})

const baseClasses = computed<string>(() => {
  const shape = props.variant === 'icon' ? 'rounded-lg' : 'inline-flex items-center justify-center gap-2 rounded-full font-medium'
  return `cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${shape}`
})

const combinedClasses = computed<string>(() => [
  baseClasses.value,
  variantClasses.value,
  sizeClasses.value,
].join(' '))

const safeRel = computed<string | undefined>(() => {
  if (props.target === '_blank' && !props.rel) {
    return 'noopener noreferrer'
  }
  return props.rel
})
</script>

<template>
  <a
    v-if="isLink"
    :href="props.disabled ? undefined : props.href"
    :target="props.target"
    :rel="safeRel"
    :aria-label="props.ariaLabel"
    :aria-disabled="props.disabled ? 'true' : undefined"
    :class="combinedClasses"
    v-bind="attrs"
  >
    <slot />
  </a>
  <button
    v-else
    :type="props.type"
    :disabled="props.disabled"
    :aria-label="props.ariaLabel"
    :class="combinedClasses"
    v-bind="attrs"
  >
    <slot />
  </button>
</template>
