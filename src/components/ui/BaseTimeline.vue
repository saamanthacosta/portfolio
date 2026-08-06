<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseSection from './BaseSection.vue'
import BaseTypography from './BaseTypography.vue'
import TimelineItem from '../timeline/TimelineItem.vue'
import type { ExperienceRecord } from '../../data/experience'
import { experience } from '../../data/experience'

defineOptions({ inheritAttrs: false })

const { t } = useI18n()
const sectionRef = ref<InstanceType<typeof BaseSection> | null>(null)
const isVisible = ref(false)

onMounted(() => {
  const el = sectionRef.value?.$el as HTMLElement | undefined
  if (!el) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 },
  )
  observer.observe(el)
})

const items = computed<ExperienceRecord[]>(() =>
  experience.map((item) => ({
    ...item,
    company: t(item.company),
    role: t(item.role),
    description: item.description ? t(item.description) : null,
  })),
)

const totalItems = computed<number>(() => experience.length)
</script>

<template>
  <BaseSection
    ref="sectionRef"
    id="experience"
    bg="raised"
    max-width="3xl"
  >
    <template #header>
      <div
        class="transition-[opacity,transform] duration-500 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <BaseTypography as="caption" variant="accent" class="mb-4 block">
          {{ t('experience.label') }}
        </BaseTypography>
        <BaseTypography as="h2" variant="muted">
          {{ t('experience.title') }}
        </BaseTypography>
      </div>
    </template>

    <ol class="relative space-y-6" :aria-label="t('experience.ariaLabel')">
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
