<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from './composables/useTheme'

import AppNav from './components/navigation/AppNav.vue'
import HeroSection from './components/hero/HeroSection.vue'
import AboutSection from './components/about/AboutSection.vue'
import BaseTimeline from './components/ui/BaseTimeline.vue'
import SkillsSection from './components/skills/SkillsSection.vue'
import ProjectsSection from './components/projects/ProjectsSection.vue'
import ContactSection from './components/contact/ContactSection.vue'
import BaseTypography from './components/ui/BaseTypography.vue'

const { t } = useI18n()
useTheme()

onMounted(() => {
  const storedLocale = localStorage.getItem('portfolio-locale')
  if (storedLocale) {
    document.documentElement.setAttribute('lang', storedLocale === 'pt-BR' ? 'pt-BR' : 'en')
  }
})
</script>

<template>
  <div id="app">
    <AppNav />

    <main>
      <HeroSection />
      <AboutSection />
      <BaseTimeline />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>

    <footer class="py-8 px-6 text-center border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      <BaseTypography as="small-body" variant="muted">
        {{ t('footer.copyright') }}
      </BaseTypography>
    </footer>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
