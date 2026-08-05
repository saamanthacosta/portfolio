<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseSection from './BaseSection.vue'
import BaseTypography from './BaseTypography.vue'
import TimelineItem from '../timeline/TimelineItem.vue'
import type { ExperienceRecord } from '../../data/experience'
import { experience } from '../../data/experience'

const { t } = useI18n()

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
  <BaseSection id="experience" background="white" align="center" container-width="md">
    <template #caption>
      <BaseTypography as="caption" variant="accent">
        {{ t('experience.label') }}
      </BaseTypography>
    </template>
    <template #title>
      <BaseTypography as="h2" variant="muted">
        {{ t('experience.title') }}
      </BaseTypography>
    </template>

    <ol
      ref="sectionRef"
      class="relative space-y-6 transition-all duration-700 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      aria-label="Experience"
    >
      <TimelineItem
        v-for="(item, index) in items"
        :key="item.id"
        :item="item"
        :index="index"
        :is-visible="isVisible"
        :total-items="totalItems"
      />
    </ol>
  </BaseSection>
</template>
