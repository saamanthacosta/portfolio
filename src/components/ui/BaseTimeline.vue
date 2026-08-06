<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseSection from './BaseSection.vue'
import TimelineItem from '../timeline/TimelineItem.vue'
import type { ExperienceRecord } from '../../data/experience'
import { experience } from '../../data/experience'

defineOptions({ inheritAttrs: false })

const { t } = useI18n()

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
    id="experience"
    bg="raised"
    :label="t('experience.label')"
    :title="t('experience.title')"
  >
    <template #default="{ isVisible }">
      <ol
        class="relative space-y-6 transition-[opacity,transform] duration-500 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        :aria-label="t('experience.ariaLabel')"
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
    </template>
  </BaseSection>
</template>
