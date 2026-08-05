<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { skills } from '../../data/experience'
import type { Skills } from '../../data/experience'
import BaseCard from '../ui/BaseCard.vue'
import BaseIcon from '../ui/BaseIcon.vue'
import BaseTypography from '../ui/BaseTypography.vue'
import SkillBadge from './SkillBadge.vue'

interface Category {
  key: keyof Skills
  icon: string
  color: string
}

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

const categories: Category[] = [
  { key: 'frontend', icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
  { key: 'backend', icon: 'M2 2h20v6H2zM2 10h20v6H2zM2 18h20', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
  { key: 'cloud', icon: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
  { key: 'database', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM6 12a6 6 0 1 1 12 0', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
]

const getCategoryIndex = (key: keyof Skills) =>
  categories.findIndex((c) => c.key === key)
</script>

<template>
  <section id="skills" class="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950" ref="sectionRef">
    <div class="max-w-5xl mx-auto px-6">
      <div
        class="text-center mb-12 transition-all duration-500 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <BaseTypography variant="caption" tone="accent" class="mb-4">
          {{ $t('skills.label') }}
        </BaseTypography>
        <BaseTypography variant="h2">
          {{ $t('skills.title') }}
        </BaseTypography>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BaseCard
          v-for="(categorySkills, categoryKey) in skills"
          :key="categoryKey"
          variant="default"
          padding="md"
          radius="md"
          hoverable
          class="transition-all duration-300"
          :style="{ transitionDelay: `${0.2 + getCategoryIndex(categoryKey) * 0.15}s` }"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="categories.find((c) => c.key === categoryKey)?.color">
              <BaseIcon decorative>
                <path :d="categories.find((c) => c.key === categoryKey)?.icon" />
              </BaseIcon>
            </div>
            <BaseTypography variant="h3" class="font-body text-base md:text-lg">
              {{ $t(`skills.categories.${categoryKey}`) }}
            </BaseTypography>
          </div>

          <div class="flex flex-wrap gap-2">
            <SkillBadge
              v-for="skill in categorySkills"
              :key="skill"
              :label="skill"
              :category="categoryKey"
            />
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
