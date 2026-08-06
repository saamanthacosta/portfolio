<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

type SectionBg = 'default' | 'raised'
type SectionAlign = 'left' | 'center'
type SectionMaxWidth = '3xl' | '5xl' | 'xl'

interface BaseSectionProps {
  id?: string
  bg?: SectionBg
  align?: SectionAlign
  maxWidth?: SectionMaxWidth
}

const props = withDefaults(defineProps<BaseSectionProps>(), {
  id: undefined,
  bg: 'default',
  align: 'center',
  maxWidth: '5xl',
})

const sectionClass = computed<string>(() =>
  props.bg === 'raised'
    ? 'bg-white dark:bg-zinc-900'
    : 'bg-zinc-50 dark:bg-zinc-950',
)

const containerClass = computed<string>(() => {
  const widths: Record<SectionMaxWidth, string> = {
    '3xl': 'max-w-3xl',
    '5xl': 'max-w-5xl',
    xl: 'max-w-xl',
  }
  return `mx-auto px-6 ${widths[props.maxWidth]}`
})

const headerClass = computed<string>(() =>
  props.align === 'center' ? 'text-center mb-12' : 'mb-8',
)
</script>

<template>
  <section :id="id" class="py-24 md:py-32" :class="sectionClass">
    <div :class="containerClass">
      <div v-if="$slots.header" :class="headerClass">
        <slot name="header" />
      </div>
      <slot />
    </div>
  </section>
</template>
