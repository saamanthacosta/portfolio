<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseTypography from './BaseTypography.vue'

defineOptions({ inheritAttrs: false })

interface BaseSectionProps {
  id?: string
  bg?: 'default' | 'raised'
  label?: string
  title?: string
  subtitle?: string
}

const props = withDefaults(defineProps<BaseSectionProps>(), {
  id: undefined,
  bg: 'default',
  label: undefined,
  title: undefined,
  subtitle: undefined,
})

const root = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  if (!root.value) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 },
  )
  observer.observe(root.value)
})

const sectionClass =
  props.bg === 'raised'
    ? 'bg-white dark:bg-zinc-900'
    : 'bg-zinc-50 dark:bg-zinc-950'
</script>

<template>
  <section
    ref="root"
    :id="id"
    class="py-24 md:py-32"
    :class="sectionClass"
  >
    <div class="max-w-5xl mx-auto px-6">
      <header
        v-if="label || title || subtitle"
        class="text-center mb-12 transition-[opacity,transform] duration-500 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <BaseTypography
          v-if="label"
          as="caption"
          variant="accent"
          class="mb-4 block"
        >
          {{ label }}
        </BaseTypography>
        <BaseTypography
          v-if="title"
          as="h2"
          :class="subtitle ? 'mb-4' : undefined"
        >
          {{ title }}
        </BaseTypography>
        <BaseTypography
          v-if="subtitle"
          as="large-body"
          variant="muted"
        >
          {{ subtitle }}
        </BaseTypography>
      </header>
      <slot :is-visible="isVisible" />
    </div>
  </section>
</template>
