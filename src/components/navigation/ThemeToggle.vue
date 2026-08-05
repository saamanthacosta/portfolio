<script setup lang="ts">
import { computed, ref } from 'vue'
import { Sun, Moon, Monitor, Check } from 'lucide-vue-next'
import type { Component } from 'vue'
import { useTheme, type Theme } from '../../composables/useTheme'
import BaseButton from '../ui/BaseButton.vue'

type ThemeIcon = 'sun' | 'moon' | 'monitor'

interface ThemeOption {
  value: Theme
  label: string
  icon: Component
}

const { theme, setTheme } = useTheme()
const isOpen = ref(false)

const iconMap: Record<ThemeIcon, Component> = {
  sun: Sun,
  moon: Moon,
  monitor: Monitor,
}

const currentIcon = computed<ThemeIcon>(() => {
  switch (theme.value) {
    case 'light':
      return 'sun'
    case 'dark':
      return 'moon'
    default:
      return 'monitor'
  }
})

const label = computed<string>(() => {
  switch (theme.value) {
    case 'light':
      return 'Light mode'
    case 'dark':
      return 'Dark mode'
    default:
      return 'System mode'
  }
})

const options: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

const toggleDropdown = (event: MouseEvent) => {
  event.stopPropagation()
  isOpen.value = !isOpen.value
}

const selectTheme = (themeValue: Theme) => {
  setTheme(themeValue)
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <BaseButton
      variant="icon"
      :aria-label="label"
      :title="label"
      :aria-expanded="isOpen"
      @click="toggleDropdown"
    >
      <component
        :is="iconMap[currentIcon]"
        :size="20"
        :stroke-width="2"
        aria-hidden="true"
      />
    </BaseButton>

    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        @click.stop
        class="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 py-2 z-50"
      >
        <button
          v-for="option in options"
          :key="option.value"
          @click="selectTheme(option.value)"
          class="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-100 cursor-pointer"
          :class="theme === option.value
            ? 'text-musgo-600 dark:text-musgo-400 bg-musgo-50 dark:bg-musgo-900/30'
            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'"
        >
          <component
            :is="option.icon"
            :size="16"
            :stroke-width="2"
            aria-hidden="true"
          />
          <span>{{ option.label }}</span>
          <Check
            v-if="theme === option.value"
            :size="16"
            :stroke-width="2.5"
            class="ml-auto text-musgo-500"
            aria-hidden="true"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>
