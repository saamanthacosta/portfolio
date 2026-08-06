<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseCard from '../ui/BaseCard.vue'
import BaseIcon from '../ui/BaseIcon.vue'
import BaseSection from '../ui/BaseSection.vue'
import BaseTypography from '../ui/BaseTypography.vue'

interface Highlight {
  key: string
  icon: string
}

defineOptions({ inheritAttrs: false })

const { t } = useI18n()

const highlights: Highlight[] = [
  { key: 'a11y', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { key: 'i18n', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
  {
    key: 'components',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
  },
  { key: 'performance', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
]
</script>

<template>
  <BaseSection
    id="about"
    bg="raised"
    :label="t('about.label')"
    :title="t('about.title')"
  >
    <template #default="{ isVisible }">
      <div
        class="transition-[opacity,transform] duration-500 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        :style="{ transitionDelay: '0.15s' }"
      >
        <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <BaseTypography as="large-body" variant="muted" class="mb-8 leading-relaxed">
              {{ t('about.description') }}
            </BaseTypography>

            <div class="grid grid-cols-2 gap-4">
              <BaseCard
                v-for="(item, index) in highlights"
                :key="item.key"
                variant="muted"
                padding="sm"
                radius="sm"
                class="transition-[opacity,transform] duration-300"
                :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
                :style="{ transitionDelay: `${0.4 + index * 0.1}s` }"
              >
                <div class="flex items-center justify-center gap-3 text-center">
                  <div class="w-10 h-10 rounded-lg bg-musgo-100 dark:bg-musgo-900 flex items-center justify-center flex-shrink-0">
                    <BaseIcon class="text-musgo-600 dark:text-musgo-400" decorative>
                      <path :d="item.icon" />
                    </BaseIcon>
                  </div>
                  <BaseTypography as="small-body" variant="muted" class="font-medium">
                    {{ t(`about.highlights.${item.key}`) }}
                  </BaseTypography>
                </div>
              </BaseCard>
            </div>
          </div>

          <div class="hidden md:flex relative justify-center items-center aspect-square max-w-md mx-auto">
            <div
              class="absolute w-4/5 h-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[opacity,transform] duration-700 ease-out"
              :class="isVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-90'"
              style="background: linear-gradient(135deg, #f0f5f1 0%, #fdf2f2 100%);"
            />
            <div
              class="absolute w-3/5 h-3/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[opacity,transform] duration-700 delay-200 ease-out"
              :class="isVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-90'"
              style="background: linear-gradient(135deg, #fdf2f2 0%, #f0f5f1 100%);"
            />
            <div class="absolute text-center z-10">
              <BaseTypography as="span" variant="primary" class="text-7xl block tabular-nums">
                5+
              </BaseTypography>
              <BaseTypography as="small-body" variant="muted" class="mt-2 block">
                {{ t('about.yearsExperience') }}
              </BaseTypography>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseSection>
</template>
