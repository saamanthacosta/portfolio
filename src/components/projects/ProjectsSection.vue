<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import BaseIcon from '../ui/BaseIcon.vue'
import BaseTypography from '../ui/BaseTypography.vue'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 },
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<template>
  <section id="projects" class="py-24 md:py-32 bg-white dark:bg-zinc-900" ref="sectionRef">
    <div class="max-w-3xl mx-auto px-6">
      <div
        class="text-center mb-12 transition-all duration-500 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <BaseTypography as="caption" variant="accent" class="mb-4">
          {{ $t('projects.label') }}
        </BaseTypography>
        <BaseTypography as="h2" class="mb-4">
          {{ $t('projects.title') }}
        </BaseTypography>
        <BaseTypography as="large-body" variant="muted">
          {{ $t('projects.description') }}
        </BaseTypography>
      </div>

      <BaseCard
        variant="dashed"
        padding="none"
        radius="lg"
        :bordered="false"
        class="flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden transition-all duration-500 ease-out"
        :style="{ transitionDelay: '0.3s' }"
        :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
      >
        <BaseIcon class="text-zinc-400 dark:text-zinc-500 mb-4" :size="80" decorative>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </BaseIcon>

        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div class="absolute top-[10%] left-[10%] w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-full opacity-30" />
          <div class="absolute top-[20%] right-[15%] w-8 h-8 bg-musgo-100 dark:bg-musgo-900/30 rounded-full opacity-30" />
          <div class="absolute bottom-[15%] left-[20%] w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full opacity-30" />
        </div>
      </BaseCard>
    </div>
  </section>
</template>
