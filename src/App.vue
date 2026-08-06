<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'
import { getLocale } from './i18n'

import AppNav from './components/navigation/AppNav.vue'
import HeroSection from './components/hero/HeroSection.vue'
import AboutSection from './components/about/AboutSection.vue'
import BaseTimeline from './components/ui/BaseTimeline.vue'
import SkillsSection from './components/skills/SkillsSection.vue'
import ProjectsSection from './components/projects/ProjectsSection.vue'
import ContactSection from './components/contact/ContactSection.vue'

useTheme()

onMounted(() => {
  const locale = getLocale()
  document.documentElement.setAttribute('lang', locale === 'pt-BR' ? 'pt-BR' : 'en')
})
</script>

<template>
  <div id="app">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only fixed top-4 left-4 z-50 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-musgo-500 dark:bg-zinc-800 dark:text-zinc-50"
    >
      {{ $t('accessibility.skipToContent') }}
    </a>
    <AppNav />

    <main id="main-content" tabindex="-1">
      <HeroSection />
      <AboutSection />
      <BaseTimeline />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
