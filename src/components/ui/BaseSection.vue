<script setup lang="ts">
import { computed } from 'vue'

type SectionBackground = 'white' | 'zinc-50'
type SectionAlign = 'left' | 'center'
type ContainerWidth = 'sm' | 'md' | 'lg' | 'xl'

interface BaseSectionProps {
  id?: string
  background?: SectionBackground
  align?: SectionAlign
  containerWidth?: ContainerWidth
}

const props = withDefaults(defineProps<BaseSectionProps>(), {
  id: undefined,
  background: 'white',
  align: 'center',
  containerWidth: 'lg',
})

const backgroundClass = computed<string>(() => {
  switch (props.background) {
    case 'zinc-50':
      return 'bg-zinc-50 dark:bg-zinc-950'
    case 'white':
    default:
      return 'bg-white dark:bg-zinc-900'
  }
})

const containerMaxWidth = computed<string>(() => {
  switch (props.containerWidth) {
    case 'sm':
      return 'max-w-xl'
    case 'md':
      return 'max-w-3xl'
    case 'xl':
      return 'max-w-5xl'
    case 'lg':
    default:
      return 'max-w-4xl'
  }
})

const headerClass = computed<string>(() =>
  props.align === 'left' ? 'text-left' : 'text-center',
)
</script>

<template>
  <section :id="id" :class="['py-24 md:py-32 relative', backgroundClass]">
    <div :class="[containerMaxWidth, 'mx-auto px-6']">
      <header :class="['mb-12 md:mb-16', headerClass]">
        <div class="mb-6">
          <slot name="caption" />
        </div>
        <slot name="title" />
      </header>
      <slot />
    </div>
  </section>
</template>
