<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

interface HibiscusFlowerProps {
  size?: number | string
  variant?: 1 | 2 | 3 | 4
  animationDelay?: number
}

const props = withDefaults(defineProps<HibiscusFlowerProps>(), {
  size: 150,
  variant: 1,
  animationDelay: 0,
})

const sizeValue = computed<string>(() =>
  typeof props.size === 'number' ? `${props.size}px` : props.size,
)

interface ColorSet {
  petal: string
  petalAlt: string
  center: string
  centerAlt: string
}

const colors: Record<1 | 2 | 3 | 4, ColorSet> = {
  1: { petal: '#d9a8a8', petalAlt: '#e8c9c9', center: '#f5c542', centerAlt: '#f5a542' },
  2: { petal: '#f5e8e8', petalAlt: '#e8ede9', center: '#f5c542', centerAlt: '#f5a542' },
  3: { petal: '#a8c3aa', petalAlt: '#c9d9cc', center: '#f5c542', centerAlt: '#e8941a' },
  4: { petal: '#b87070', petalAlt: '#d9a8a8', center: '#f5c542', centerAlt: '#f5a542' },
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
    <g class="animate-flower-in">
      <ellipse cx="50" cy="26" rx="17" ry="24" :fill="colorSet.petal" />
      <ellipse cx="74" cy="42" rx="17" ry="24" :fill="colorSet.petalAlt" transform="rotate(60 74 42)" />
      <ellipse cx="70" cy="72" rx="17" ry="24" :fill="colorSet.petal" transform="rotate(120 70 72)" />
      <ellipse cx="30" cy="72" rx="17" ry="24" :fill="colorSet.petalAlt" transform="rotate(-120 30 72)" />
      <ellipse cx="26" cy="42" rx="17" ry="24" :fill="colorSet.petal" transform="rotate(-60 26 42)" />
      <circle cx="50" cy="50" r="10" :fill="colorSet.center" />
      <circle cx="50" cy="50" r="7" :fill="colorSet.centerAlt" />
    </g>
  </svg>
</template>
