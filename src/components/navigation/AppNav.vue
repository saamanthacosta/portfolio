<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '../ui/BaseButton.vue'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'

interface NavItem {
  key: string
  href: string
}

const { t } = useI18n()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const navRef = ref<HTMLElement | null>(null)

const navItems: NavItem[] = [
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenuAndRestoreFocus = () => {
  isMobileMenuOpen.value = false
  void nextTick(() => {
    requestAnimationFrame(() => {
      navRef.value?.querySelector<HTMLElement>('[aria-controls="mobile-menu"]')?.focus()
    })
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const headerClasses = computed<string>(() =>
  isScrolled.value ? 'shadow-sm shadow-black/10 dark:shadow-black/40' : '',
)
</script>

<template>
  <header
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-30 py-4 transition-[box-shadow] duration-200 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md"
    :class="headerClasses"
  >
    <div class="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
      <a href="#" class="inline-flex min-h-11 items-center font-heading text-xl cursor-pointer">
        <span class="text-zinc-900 dark:text-zinc-50">Samantha</span>
        <span class="text-pink-600 dark:text-pink-400 ml-0.5">Costa</span>
      </a>

      <nav class="hidden md:flex items-center gap-8" :aria-label="t('accessibility.mainNavigation')">
        <a
          v-for="item in navItems"
          :key="item.key"
          :href="item.href"
          class="inline-flex min-h-11 items-center text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:text-musgo-600 dark:hover:text-musgo-400 transition-colors duration-150 cursor-pointer"
        >
          {{ t(`nav.${item.key}`) }}
        </a>
      </nav>

      <div class="flex items-center gap-1">
        <ThemeToggle />
        <LanguageToggle />

        <BaseButton
          variant="icon"
          class="md:hidden"
          :aria-label="isMobileMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          @click="toggleMobileMenu"
          @keydown.esc="closeMobileMenuAndRestoreFocus"
        >
          <span class="flex flex-col gap-1.5">
            <span
              class="block w-6 h-0.5 bg-current transition-[opacity,transform] duration-150"
              :class="isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''"
            />
            <span
              class="block w-6 h-0.5 bg-current transition-[opacity,transform] duration-150"
              :class="isMobileMenuOpen ? 'opacity-0' : ''"
            />
            <span
              class="block w-6 h-0.5 bg-current transition-[opacity,transform] duration-150"
              :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"
            />
          </span>
        </BaseButton>
      </div>
    </div>

    <Transition
      enter-active-class="transition-[opacity,transform] duration-300 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-[opacity,transform] duration-200 ease-out"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        :aria-label="t('accessibility.mobileNavigation')"
        class="md:hidden flex flex-col px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800"
        @keydown.esc="closeMobileMenuAndRestoreFocus"
      >
        <a
          v-for="item in navItems"
          :key="item.key"
          :href="item.href"
          class="py-4 text-base font-medium text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 last:border-0 cursor-pointer"
          @click="closeMobileMenuAndRestoreFocus"
        >
          {{ t(`nav.${item.key}`) }}
        </a>
      </nav>
    </Transition>
  </header>
</template>
