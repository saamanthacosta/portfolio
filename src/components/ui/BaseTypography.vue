<script setup lang="ts">
import { computed, useAttrs } from 'vue'

type TypographyLevel =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'large-body'
  | 'body'
  | 'small-body'
  | 'caption'
  | 'mono'

type TypographyVariant = 'default' | 'muted' | 'primary' | 'accent' | 'inverse'

type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'label'

type TypographyAlign = 'left' | 'center' | 'right'

interface BaseTypographyProps {
  level?: TypographyLevel
  variant?: TypographyVariant
  as?: TypographyElement
  align?: TypographyAlign
  truncate?: boolean
}

const props = withDefaults(defineProps<BaseTypographyProps>(), {
  level: 'body',
  variant: 'default',
  as: undefined,
  align: 'left',
  truncate: false,
})

const attrs = useAttrs()

const resolvedElement = computed<TypographyElement>(() => {
  if (props.as) return props.as
  switch (props.level) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return props.level
    case 'large-body':
    case 'body':
    case 'small-body':
      return 'p'
    case 'caption':
    case 'mono':
      return 'span'
  }
})

const levelClasses = computed<string>(() => {
  switch (props.level) {
    case 'h1':
      return 'font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
    case 'h2':
      return 'font-heading text-3xl md:text-4xl'
    case 'h3':
      return 'font-heading text-xl md:text-2xl'
    case 'h4':
      return 'font-heading text-lg md:text-xl'
    case 'h5':
      return 'font-body text-base md:text-lg font-semibold'
    case 'h6':
      return 'font-body text-sm md:text-base font-semibold'
    case 'large-body':
      return 'text-lg leading-relaxed'
    case 'small-body':
      return 'text-sm'
    case 'caption':
      return 'text-xs font-semibold uppercase tracking-wider'
    case 'mono':
      return 'font-mono text-xs font-medium'
    case 'body':
    default:
      return 'text-base'
  }
})

const variantClasses = computed<string>(() => {
  switch (props.variant) {
    case 'muted':
      return 'text-zinc-500 dark:text-zinc-400'
    case 'primary':
      return 'text-musgo-600 dark:text-musgo-400'
    case 'accent':
      return 'text-pink-600 dark:text-pink-400'
    case 'inverse':
      return 'text-white'
    case 'default':
    default:
      return 'text-zinc-900 dark:text-zinc-50'
  }
})

const alignClasses = computed<string>(() => {
  switch (props.align) {
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    case 'left':
    default:
      return 'text-left'
  }
})

const truncateClasses = computed<string>(() =>
  props.truncate ? 'truncate overflow-hidden text-ellipsis whitespace-nowrap' : '',
)

const combinedClasses = computed<string>(() =>
  [
    levelClasses.value,
    variantClasses.value,
    alignClasses.value,
    truncateClasses.value,
  ]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <component :is="resolvedElement" :class="combinedClasses" v-bind="attrs">
    <slot />
  </component>
</template>
