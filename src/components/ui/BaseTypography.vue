<script setup lang="ts">
import { computed, useAttrs } from 'vue'

type TypographyVariant =
  | 'display'
  | 'heading'
  | 'subheading'
  | 'lead'
  | 'body'
  | 'caption'
  | 'eyebrow'
  | 'mono'
type TypographyTone = 'default' | 'muted' | 'primary' | 'accent' | 'inverse'
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
  variant?: TypographyVariant
  tone?: TypographyTone
  as?: TypographyElement
  align?: TypographyAlign
  truncate?: boolean
}

const props = withDefaults(defineProps<BaseTypographyProps>(), {
  variant: 'body',
  tone: 'default',
  as: undefined,
  align: 'left',
  truncate: false,
})

const attrs = useAttrs()

const resolvedElement = computed<TypographyElement>(() => {
  if (props.as) return props.as
  switch (props.variant) {
    case 'display':
      return 'h1'
    case 'heading':
      return 'h2'
    case 'subheading':
      return 'h3'
    case 'lead':
      return 'p'
    case 'caption':
      return 'span'
    case 'eyebrow':
      return 'span'
    case 'mono':
      return 'span'
    case 'body':
    default:
      return 'p'
  }
})

const variantClasses = computed<string>(() => {
  switch (props.variant) {
    case 'display':
      return 'font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
    case 'heading':
      return 'font-heading text-3xl md:text-4xl'
    case 'subheading':
      return 'font-heading text-xl md:text-2xl'
    case 'lead':
      return 'text-lg md:text-xl font-medium'
    case 'caption':
      return 'text-xs'
    case 'eyebrow':
      return 'text-sm font-semibold uppercase tracking-wider'
    case 'mono':
      return 'font-mono text-xs font-medium'
    case 'body':
    default:
      return 'text-base'
  }
})

const toneClasses = computed<string>(() => {
  switch (props.tone) {
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
    variantClasses.value,
    toneClasses.value,
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
