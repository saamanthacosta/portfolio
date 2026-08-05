<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Accessibility, Languages, LayoutGrid, Zap } from 'lucide-vue-next'
import BaseSection from '../ui/BaseSection.vue'
import BaseCard from '../ui/BaseCard.vue'
import BaseTypography from '../ui/BaseTypography.vue'
import type { Component } from 'vue'

interface Highlight {
  key: string
  icon: Component
}

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

const highlights: Highlight[] = [
  { key: 'a11y', icon: Accessibility },
  { key: 'i18n', icon: Languages },
  { key: 'components', icon: LayoutGrid },
  { key: 'performance', icon: Zap },
]
</script>

<template>
  <BaseSection
    id="about"
    background="white"
    align="left"
    container-width="xl"
  >
    <template #caption>
      <BaseTypography as="caption" variant="accent">
        {{ $t('about.label') }}
      </BaseTypography>
    </template>
    <template #title>
      <BaseTypography as="h2" class="leading-tight">
        {{ $t('about.title') }}
      </BaseTypography>
    </template>

    <div
      ref="sectionRef"
      class="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-center transition-all duration-700 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div>
        <BaseTypography as="large-body" variant="muted" class="mb-10 leading-relaxed">
          {{ $t('about.description') }}
        </BaseTypography>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BaseCard
            v-for="(item, index) in highlights"
            :key="item.key"
            variant="muted"
            padding="md"
            radius="md"
            :style="{ transitionDelay: `${index * 0.1}s` }"
            :class="['transition-all duration-500', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4']"
          >
            <div class="flex items-start gap-3">
              <div class="w-11 h-11 rounded-lg bg-musgo-100 dark:bg-musgo-900 flex items-center justify-center flex-shrink-0">
                <component
                  :is="item.icon"
                  :size="22"
                  :stroke-width="2"
                  class="text-musgo-600 dark:text-musgo-400"
                  aria-hidden="true"
                />
              </div>
              <BaseTypography as="small-body" variant="muted" class="font-medium leading-snug pt-1.5">
                {{ $t(`about.highlights.${item.key}`) }}
              </BaseTypography>
            </div>
          </BaseCard>
        </div>
      </div>

      <div class="hidden lg:flex relative justify-center items-center aspect-square max-w-sm mx-auto w-full">
        <div
          class="absolute w-4/5 h-4/5 rounded-full transition-all duration-700 ease-out"
          :class="isVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-90'"
          style="background: linear-gradient(135deg, #f0f5f1 0%, #fdf2f2 100%);"
        />
        <div
          class="absolute w-3/5 h-3/5 rounded-full transition-all duration-700 delay-200 ease-out"
          :class="isVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-90'"
          style="background: linear-gradient(135deg, #fdf2f2 0%, #f0f5f1 100%);"
        />
        <div class="relative text-center z-10 flex flex-col items-center gap-2">
          <span class="font-heading text-musgo-600 dark:text-musgo-400 leading-none text-[5.5rem] sm:text-[6.5rem]">
            5<span class="text-pink-500 dark:text-pink-400">+</span>
          </span>
          <span class="block w-12 h-px bg-musgo-300 dark:bg-musgo-700" />
          <BaseTypography as="small-body" variant="muted" class="font-medium uppercase tracking-wider">
            Years of experience
          </BaseTypography>
        </div>
      </div>
    </div>
  </BaseSection>
</template>
