<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseTypography from './BaseTypography.vue'
import TimelineItem from '../timeline/TimelineItem.vue'
import type { ExperienceRecord } from '../../data/experience'
import { experience } from '../../data/experience'

const { t } = useI18n()

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

const items = computed<ExperienceRecord[]>(() =>
  experience.map((item) => ({
    ...item,
    company: item.company.includes('.') ? t(item.company) : item.company,
    role: item.role.includes('.') ? t(item.role) : item.role,
    description:
      item.description && item.description.includes('.')
        ? t(item.description)
        : item.description,
  })),
)

const totalItems = computed<number>(() => experience.length)
</script>

<template>
  <section
    id="experience"
    ref="sectionRef"
    class="py-24 md:py-32 bg-white dark:bg-zinc-900"
  >
    <div class="max-w-3xl mx-auto px-6">
      <div
        class="text-center mb-16 transition-all duration-500 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <BaseTypography level="caption" variant="accent" class="mb-4">
          {{ t('experience.label') }}
        </BaseTypography>
        <BaseTypography level="h2" variant="muted">
          {{ t('experience.title') }}
        </BaseTypography>
      </div>

      <ol class="relative space-y-6" aria-label="Experience">
        <TimelineItem
          v-for="(item, index) in items"
          :key="item.id"
          :item="item"
          :index="index"
          :is-visible="isVisible"
          :total-items="totalItems"
        />
      </ol>
    </div>
  </section>
</template>
