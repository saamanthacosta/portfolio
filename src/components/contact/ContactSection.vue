<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { contact } from '../../data/experience'
import BaseCard from '../ui/BaseCard.vue'
import BaseIcon from '../ui/BaseIcon.vue'
import BaseSection from '../ui/BaseSection.vue'
import BaseTypography from '../ui/BaseTypography.vue'

interface SocialLink {
  key: string
  label: string
  href: string
  icon: string
}

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

const socialLinks = computed<SocialLink[]>(() => [
  {
    key: 'email',
    label: t('contact.email'),
    href: `mailto:${contact.email}`,
    icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  },
  {
    key: 'linkedin',
    label: t('contact.linkedin'),
    href: contact.linkedin,
    icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
  {
    key: 'github',
    label: t('contact.github'),
    href: contact.github,
    icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  },
])
</script>

<template>
  <BaseSection
    ref="sectionRef"
    id="contact"
    bg="raised"
    max-width="xl"
  >
    <template #header>
      <div
        class="transition-[opacity,transform] duration-500 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <BaseTypography as="caption" variant="accent" class="mb-4 block">
          {{ t('contact.label') }}
        </BaseTypography>
        <BaseTypography as="h2" class="mb-4">
          {{ t('contact.title') }}
        </BaseTypography>
        <BaseTypography as="large-body" variant="muted">
          {{ t('contact.description') }}
        </BaseTypography>
      </div>
    </template>

    <div class="flex flex-col gap-4">
      <BaseCard
        v-for="(link, index) in socialLinks"
        :key="link.key"
        variant="muted"
        radius="md"
        hoverable
        padding="sm"
        class="transition-[opacity,transform,box-shadow] duration-200"
        :style="{ transitionDelay: `${0.4 + index * 0.15}s` }"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
      >
        <a
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-4 text-zinc-900 dark:text-zinc-50"
        >
          <span class="w-12 h-12 flex items-center justify-center bg-musgo-100 dark:bg-musgo-900 rounded-xl text-musgo-600 dark:text-musgo-400 flex-shrink-0">
            <BaseIcon size="lg" decorative>
              <path :d="link.icon" />
            </BaseIcon>
          </span>
          <BaseTypography as="body" class="flex-1 text-left font-medium">
            {{ link.label }}
          </BaseTypography>
          <BaseIcon class="text-zinc-400" size="md" decorative>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </BaseIcon>
        </a>
      </BaseCard>
    </div>
  </BaseSection>

  <footer class="py-8 px-6 text-center border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
    <BaseTypography as="small-body" variant="muted">
      {{ t('footer.copyright') }}
    </BaseTypography>
  </footer>
</template>
