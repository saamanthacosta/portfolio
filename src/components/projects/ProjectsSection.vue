<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseCard from '../ui/BaseCard.vue'
import BaseIcon from '../ui/BaseIcon.vue'
import BaseSection from '../ui/BaseSection.vue'

defineOptions({ inheritAttrs: false })

const { t } = useI18n()
</script>

<template>
  <BaseSection
    id="projects"
    bg="raised"
    :label="t('projects.label')"
    :title="t('projects.title')"
    :subtitle="t('projects.description')"
  >
    <template #default="{ isVisible }">
      <BaseCard
        variant="dashed"
        padding="none"
        radius="lg"
        class="flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden transition-[opacity,transform] duration-500 ease-out"
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
    </template>
  </BaseSection>
</template>
