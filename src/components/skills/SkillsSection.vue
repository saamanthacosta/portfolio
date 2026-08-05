<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Code2, Server, Cloud, Database } from 'lucide-vue-next'
import type { Component } from 'vue'
import { skills } from '../../data/experience'
import type { Skills } from '../../data/experience'
import BaseSection from '../ui/BaseSection.vue'
import BaseCard from '../ui/BaseCard.vue'
import BaseTypography from '../ui/BaseTypography.vue'
import SkillBadge from './SkillBadge.vue'

interface Category {
  key: keyof Skills
  icon: Component
  color: string
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

const categories: Category[] = [
  { key: 'frontend', icon: Code2, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
  { key: 'backend', icon: Server, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
  { key: 'cloud', icon: Cloud, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
  { key: 'database', icon: Database, color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
]

const getCategoryIndex = (key: keyof Skills) =>
  categories.findIndex((c) => c.key === key)
</script>

<template>
  <BaseSection id="skills" background="zinc-50" align="center" container-width="xl">
    <template #caption>
      <BaseTypography as="caption" variant="accent">
        {{ $t('skills.label') }}
      </BaseTypography>
    </template>
    <template #title>
      <BaseTypography as="h2">
        {{ $t('skills.title') }}
      </BaseTypography>
    </template>

    <div
      ref="sectionRef"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
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
        <div class="flex items-center gap-3 mb-5">
          <div
            class="w-11 h-11 rounded-lg flex items-center justify-center"
            :class="categories.find((c) => c.key === categoryKey)?.color"
          >
            <component
              :is="categories.find((c) => c.key === categoryKey)?.icon"
              :size="22"
              :stroke-width="2"
              aria-hidden="true"
            />
          </div>
          <BaseTypography as="h3" class="font-body text-base md:text-lg">
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
  </BaseSection>
</template>
