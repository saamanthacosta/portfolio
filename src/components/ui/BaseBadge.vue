<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

type BadgeVariant = 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'muted'
type BadgeSize = 'compact' | 'regular'
type BadgeShape = 'rounded' | 'pill'

interface BaseBadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  shape?: BadgeShape
  inline?: boolean
}

const props = withDefaults(defineProps<BaseBadgeProps>(), {
  variant: 'neutral',
  size: 'regular',
  shape: 'rounded',
  inline: true,
})

const attrs = useAttrs()

const variantClasses = computed<string>(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-musgo-100 dark:bg-musgo-900 text-musgo-700 dark:text-musgo-300 border-musgo-200 dark:border-musgo-700'
    case 'accent':
      return 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 border-transparent'
    case 'success':
      return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-transparent'
    case 'warning':
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-transparent'
    case 'muted':
      return 'bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 border-transparent'
    case 'neutral':
    default:
      return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
  }
})

const sizeClasses = computed<string>(() => {
  switch (props.size) {
    case 'compact':
      return 'px-2.5 py-1 text-xs'
    case 'regular':
    default:
      return 'px-3 py-1.5 text-xs'
  }
})

const shapeClasses = computed<string>(() => {
  switch (props.shape) {
    case 'pill':
      return 'rounded-full'
    case 'rounded':
    default:
      return 'rounded-lg'
  }
})

const borderClasses = computed<string>(() => 'border')

const displayClasses = computed<string>(() =>
  props.inline ? 'inline-flex items-center' : 'flex items-center',
)

const combinedClasses = computed<string>(() =>
  [
    displayClasses.value,
    'font-medium',
    borderClasses.value,
    variantClasses.value,
    sizeClasses.value,
    shapeClasses.value,
  ].join(' '),
)
</script>

<template>
  <span :class="combinedClasses" v-bind="attrs">
    <slot />
  </span>
</template>
