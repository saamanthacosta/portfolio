<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

interface PetalLeafProps {
  size?: number | string
  variant?: 1 | 2 | 3 | 4 | 5
  animationDelay?: number
}

const props = withDefaults(defineProps<PetalLeafProps>(), {
  size: 80,
  variant: 1,
  animationDelay: 0,
})

const sizeValue = computed<string>(() =>
  typeof props.size === 'number' ? `${props.size}px` : props.size,
)

interface ColorSet {
  fill: string
  stroke: string
}

const colors: Record<1 | 2 | 3 | 4 | 5, ColorSet> = {
  1: { fill: '#a8c3aa', stroke: '#7da682' },
  2: { fill: '#7da682', stroke: '#5a8a5f' },
  3: { fill: '#c9d9cc', stroke: '#a8c3aa' },
  4: { fill: '#5a8a5f', stroke: '#4a7250' },
  5: { fill: '#6b9a6f', stroke: '#5a8a5f' },
}

const colorSet = computed<ColorSet>(() => colors[props.variant])

const animationStyle = computed<CSSProperties>(() => ({
  animationDelay: `${props.animationDelay}ms`,
}))
</script>

<template>
  <svg
    :width="sizeValue"
    :height="sizeValue"
    viewBox="0 0 100 100"
    class="pointer-events-none"
    :style="animationStyle"
  >
    <g class="animate-petal-in">
      <path
        d="M50 5C50 5 85 25 85 55C85 75 70 90 50 95C30 90 15 75 15 55C15 25 50 5 50 5Z"
        :fill="colorSet.fill"
        :stroke="colorSet.stroke"
        stroke-width="1.5"
      />
      <path
        d="M50 20V85"
        :stroke="colorSet.stroke"
        stroke-width="1.5"
        opacity="0.5"
      />
    </g>
  </svg>
</template>
