<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ImageOff } from 'lucide-vue-next'
import BaseSection from '../ui/BaseSection.vue'
import BaseCard from '../ui/BaseCard.vue'
import BaseTypography from '../ui/BaseTypography.vue'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(true)

onMounted(() => {
  if (!sectionRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()
  if (rect.top < window.innerHeight && rect.bottom > 0) return

  isVisible.value = false
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 },
  )
  observer.observe(sectionRef.value)
})
</script>

<template>
  <BaseSection id="projects" background="white" align="center" container-width="md">
    <template #caption>
      <BaseTypography as="caption" variant="accent">
        {{ $t('projects.label') }}
      </BaseTypography>
    </template>
    <template #title>
      <BaseTypography as="h2">
        {{ $t('projects.title') }}
      </BaseTypography>
    </template>
    <template #default>
      <BaseTypography as="large-body" variant="muted" class="mb-12">
        {{ $t('projects.description') }}
      </BaseTypography>

      <div
        ref="sectionRef"
        class="transition-all duration-700 ease-out"
        :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
      >
        <BaseCard
          variant="dashed"
          padding="none"
          radius="lg"
          :bordered="false"
          class="flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden"
        >
          <ImageOff
            :size="80"
            :stroke-width="1.5"
            class="text-zinc-400 dark:text-zinc-500"
            aria-hidden="true"
          />

          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="absolute top-[10%] left-[10%] w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-full opacity-30" />
            <div class="absolute top-[20%] right-[15%] w-8 h-8 bg-musgo-100 dark:bg-musgo-900/30 rounded-full opacity-30" />
            <div class="absolute bottom-[15%] left-[20%] w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full opacity-30" />
          </div>
        </BaseCard>
      </div>
    </template>
  </BaseSection>
</template>
