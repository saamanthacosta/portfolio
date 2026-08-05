<script setup lang="ts">
import { computed, useAttrs } from 'vue'

type TimelineOrientation = 'vertical' | 'horizontal'
type TimelineSpacing = 'compact' | 'default' | 'relaxed'
type TimelineElement = 'ol' | 'ul' | 'div'

interface BaseTimelineProps {
  orientation?: TimelineOrientation
  spacing?: TimelineSpacing
  element?: TimelineElement
  label?: string
}

const props = withDefaults(defineProps<BaseTimelineProps>(), {
  orientation: 'vertical',
  spacing: 'default',
  element: 'ol',
  label: undefined,
})

const attrs = useAttrs()

const spacingClasses = computed<string>(() => {
  if (props.orientation === 'horizontal') {
    switch (props.spacing) {
      case 'compact':
        return 'gap-3'
      case 'relaxed':
        return 'gap-10'
      case 'default':
      default:
        return 'gap-6'
    }
  }
  switch (props.spacing) {
    case 'compact':
      return 'space-y-4'
    case 'relaxed':
      return 'space-y-12'
    case 'default':
    default:
      return 'space-y-6'
  }
})

const orientationClasses = computed<string>(() => {
  if (props.orientation === 'horizontal') {
    return 'flex flex-row items-start overflow-x-auto'
  }
  return 'flex flex-col'
})

const ariaRole = computed(() => (props.label ? 'list' : undefined))
const ariaLabel = computed(() => props.label)

const combinedClasses = computed<string>(() => [orientationClasses.value, spacingClasses.value].join(' '))
</script>

<template>
  <component
    :is="props.element"
    :class="combinedClasses"
    :aria-label="ariaLabel"
    :role="ariaRole"
    v-bind="attrs"
  >
    <slot />
  </component>
</template>
