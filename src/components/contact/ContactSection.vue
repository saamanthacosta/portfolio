<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-vue-next'
import type { Component } from 'vue'
import { contact } from '../../data/experience'
import BaseSection from '../ui/BaseSection.vue'
import BaseCard from '../ui/BaseCard.vue'
import BaseTypography from '../ui/BaseTypography.vue'

interface SocialLink {
  key: string
  label: string
  href: string
  icon: Component
}

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

const socialLinks: SocialLink[] = [
  { key: 'email', label: t('contact.email'), href: `mailto:${contact.email}`, icon: Mail },
  { key: 'linkedin', label: t('contact.linkedin'), href: contact.linkedin, icon: Linkedin },
  { key: 'github', label: t('contact.github'), href: contact.github, icon: Github },
]
</script>

<template>
  <BaseSection id="contact" background="white" align="center" container-width="sm">
    <template #caption>
      <BaseTypography as="caption" variant="accent">
        {{ t('contact.label') }}
      </BaseTypography>
    </template>
    <template #title>
      <BaseTypography as="h2">
        {{ t('contact.title') }}
      </BaseTypography>
    </template>
    <template #default>
      <BaseTypography as="large-body" variant="muted" class="mb-10">
        {{ t('contact.description') }}
      </BaseTypography>

      <div
        ref="sectionRef"
        class="flex flex-col gap-3 transition-all duration-700 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <BaseCard
          v-for="(link, index) in socialLinks"
          :key="link.key"
          variant="muted"
          radius="md"
          hoverable
          padding="none"
          class="transition-all duration-300"
          :style="{ transitionDelay: `${0.4 + index * 0.15}s` }"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
        >
          <a
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 px-5 py-4 text-zinc-900 dark:text-zinc-50"
          >
            <span class="w-11 h-11 flex items-center justify-center bg-musgo-100 dark:bg-musgo-900 rounded-xl text-musgo-600 dark:text-musgo-400 flex-shrink-0">
              <component
                :is="link.icon"
                :size="20"
                :stroke-width="2"
                aria-hidden="true"
              />
            </span>
            <BaseTypography as="body" class="flex-1 text-left font-medium">
              {{ link.label }}
            </BaseTypography>
            <ArrowRight
              :size="18"
              :stroke-width="2"
              class="text-zinc-400"
              aria-hidden="true"
            />
          </a>
        </BaseCard>
      </div>
    </template>
  </BaseSection>

  <footer class="py-8 px-6 text-center border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
    <BaseTypography as="small-body" variant="muted">
      {{ t('footer.copyright') }}
    </BaseTypography>
  </footer>
</template>
