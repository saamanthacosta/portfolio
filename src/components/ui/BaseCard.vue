<script setup lang="ts">
import { computed, useAttrs } from 'vue'

type CardVariant = 'default' | 'muted' | 'dashed' | 'solid'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'
type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'
type CardElement = 'div' | 'section' | 'article' | 'aside'

interface BaseCardProps {
  variant?: CardVariant
  padding?: CardPadding
  radius?: CardRadius
  element?: CardElement
  hoverable?: boolean
  bordered?: boolean
}

const props = withDefaults(defineProps<BaseCardProps>(), {
  variant: 'default',
  padding: 'md',
  radius: 'md',
  element: 'div',
  hoverable: false,
  bordered: true,
})

const attrs = useAttrs()

const variantClasses = computed<string>(() => {
  switch (props.variant) {
    case 'default':
      return 'bg-white dark:bg-zinc-900'
    case 'muted':
      return 'bg-zinc-50 dark:bg-zinc-800'
    case 'dashed':
      return 'bg-zinc-50 dark:bg-zinc-800 border-dashed'
    case 'solid':
      return 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
  }
})

const paddingClasses = computed<string>(() => {
  switch (props.padding) {
    case 'none':
      return ''
    case 'sm':
      return 'p-4'
    case 'lg':
      return 'p-8'
    case 'md':
    default:
      return 'p-6'
  }
})

const radiusClasses = computed<string>(() => {
  switch (props.radius) {
    case 'none':
      return 'rounded-none'
    case 'sm':
      return 'rounded-xl'
    case 'md':
      return 'rounded-2xl'
    case 'lg':
      return 'rounded-3xl'
    case 'full':
      return 'rounded-full'
  }
})

const borderClasses = computed<string>(() => {
  if (!props.bordered) return ''
  if (props.variant === 'dashed') {
    return 'border-2 border-zinc-300 dark:border-zinc-600'
  }
  return 'border border-zinc-200 dark:border-zinc-700'
})

const hoverClasses = computed<string>(() =>
  props.hoverable ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg' : '',
)

const combinedClasses = computed<string>(() =>
  [
    variantClasses.value,
    paddingClasses.value,
    radiusClasses.value,
    borderClasses.value,
    hoverClasses.value,
  ]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <component :is="props.element" :class="combinedClasses" v-bind="attrs">
    <slot />
  </component>
</template>
