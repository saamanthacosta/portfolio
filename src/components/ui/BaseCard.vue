<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

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

const ownClasses = computed<string>(() => {
  const variant: Record<CardVariant, string> = {
    default: 'bg-white dark:bg-zinc-900',
    muted: 'bg-zinc-50 dark:bg-zinc-800',
    dashed: 'bg-zinc-50 dark:bg-zinc-800 border-dashed',
    solid: 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700',
  }
  const padding: Record<Exclude<CardPadding, 'none'>, string> = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  const radius: Record<Exclude<CardRadius, 'none'>, string> = {
    sm: 'rounded-xl',
    md: 'rounded-2xl',
    lg: 'rounded-3xl',
    full: 'rounded-full',
  }
  const border = props.bordered
    ? props.variant === 'dashed'
      ? 'border-2 border-zinc-300 dark:border-zinc-600'
      : 'border border-zinc-200 dark:border-zinc-700'
    : ''
  const hover = props.hoverable
    ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'
    : ''
  return [
    variant[props.variant],
    props.padding === 'none' ? '' : padding[props.padding],
    props.radius === 'none' ? '' : radius[props.radius],
    border,
    hover,
  ]
    .filter(Boolean)
    .join(' ')
})

const incomingClass = computed<string>(() => {
  const cls = attrs.class
  if (typeof cls === 'string') return cls
  if (Array.isArray(cls)) return cls.filter(Boolean).join(' ')
  return ''
})

const mergedClass = computed<string>(() =>
  [ownClasses.value, incomingClass.value].filter(Boolean).join(' '),
)
</script>

<template>
  <component :is="props.element" :class="mergedClass">
    <slot />
  </component>
</template>
