<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'

import AppNav from './components/navigation/AppNav.vue'
import HeroSection from './components/hero/HeroSection.vue'
import AboutSection from './components/about/AboutSection.vue'
import TimelineSection from './components/timeline/TimelineSection.vue'
import SkillsSection from './components/skills/SkillsSection.vue'
import ProjectsSection from './components/projects/ProjectsSection.vue'
import ContactSection from './components/contact/ContactSection.vue'

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
      <TimelineSection />
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
