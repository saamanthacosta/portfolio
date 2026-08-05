<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseBadge from '../ui/BaseBadge.vue'
import BaseCard from '../ui/BaseCard.vue'
import BaseIcon from '../ui/BaseIcon.vue'
import BaseTypography from '../ui/BaseTypography.vue'
import type { ExperienceRecord } from '../../data/experience'

interface TimelineItemProps {
  item: ExperienceRecord
  index: number
  isVisible: boolean
  totalItems: number
}

const props = defineProps<TimelineItemProps>()

const { t } = useI18n()

const isConfidential = computed<boolean>(
  () => props.item.description === null && props.item.isCurrent,
)
const animationDelay = computed<number>(() => 0.2 + props.index * 0.15)
const isLast = computed<boolean>(() => props.index >= props.totalItems - 1)
</script>

<template>
  <div
    class="relative transition-all duration-500 ease-out"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    :style="{ transitionDelay: `${animationDelay}s` }"
  >
    <div class="flex gap-6 md:gap-8">
      <div class="flex flex-col items-center flex-shrink-0 w-8 md:w-10">
        <div
          class="w-4 h-4 rounded-full bg-white dark:bg-zinc-800 border-2 transition-all duration-200 z-10"
          :class="[
            item.isCurrent
              ? 'border-pink-500 dark:border-pink-400 shadow-[0_0_0_3px_#fafaf9] dark:shadow-[0_0_0_3px_#09090b] animate-pulse'
              : 'border-musgo-500 dark:border-musgo-400',
          ]"
        />
        <div
          v-if="!isLast"
          class="w-0.5 flex-1 mt-1"
          :class="index === 0 ? 'bg-gradient-to-b from-pink-500 to-musgo-500 dark:from-pink-400 dark:to-musgo-500' : 'bg-musgo-500 dark:bg-musgo-400'"
        />
      </div>

      <div class="flex-1" :class="!isLast ? 'pb-10' : ''">
        <BaseCard
          variant="solid"
          padding="md"
          radius="md"
          hoverable
          class="transition-all duration-200"
        >
          <div class="flex items-center gap-2 mb-3 flex-wrap">
            <BaseTypography variant="mono" tone="muted">
              {{ item.startDate }}
            </BaseTypography>
            <span v-if="item.endDate" class="text-zinc-400 dark:text-zinc-600">→</span>
            <BaseTypography v-if="item.endDate" variant="mono" tone="muted">
              {{ item.endDate }}
            </BaseTypography>
            <BaseBadge
              v-if="item.isCurrent"
              variant="accent"
              size="compact"
              shape="pill"
              class="ml-auto"
            >
              {{ t('experience.currentlyHere') }}
            </BaseBadge>
          </div>

          <BaseTypography variant="h3" class="mb-1">
            {{ item.company }}
          </BaseTypography>
          <BaseTypography variant="body" tone="primary" class="mb-4 font-medium">
            {{ item.role }}
          </BaseTypography>

          <BaseTypography v-if="item.description" variant="body" tone="muted" class="leading-relaxed mb-4">
            {{ item.description }}
          </BaseTypography>

          <BaseTypography v-else-if="item.isCurrent" variant="body" tone="muted" class="mb-4">
            Currently working on confidential projects. Building accessible, performant web applications with modern technologies.
          </BaseTypography>

          <BaseCard
            v-if="isConfidential"
            variant="muted"
            padding="sm"
            radius="sm"
            :bordered="false"
            class="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-4"
          >
            <BaseIcon class="flex-shrink-0 text-pink-500 dark:text-pink-400" size="sm" decorative>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </BaseIcon>
            <span>{{ t('experience.confidential') }}</span>
          </BaseCard>

          <div v-if="item.tech.length > 0" class="space-y-2">
            <BaseTypography variant="caption" tone="muted" class="text-[10px]">
              Tech Stack
            </BaseTypography>
            <div class="flex flex-wrap gap-2">
              <BaseBadge
                v-for="tech in item.tech"
                :key="tech"
                variant="muted"
                size="compact"
                shape="rounded"
              >
                {{ tech }}
              </BaseBadge>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: timeline-pulse 2s infinite;
}

@keyframes timeline-pulse {
  0%, 100% {
    box-shadow: 0 0 0 3px #fafaf9, 0 0 0 5px #d97070;
  }
  50% {
    box-shadow: 0 0 0 3px #fafaf9, 0 0 0 8px #f3aeae;
  }
}

:global(body.dark) .animate-pulse {
  animation: timeline-pulse-dark 2s infinite;
}

@keyframes timeline-pulse-dark {
  0%, 100% {
    box-shadow: 0 0 0 3px #09090b, 0 0 0 5px #d97070;
  }
  50% {
    box-shadow: 0 0 0 3px #09090b, 0 0 0 8px #f3aeae;
  }
}
</style>
