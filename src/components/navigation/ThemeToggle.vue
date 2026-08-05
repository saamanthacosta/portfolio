<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme, type Theme } from '../../composables/useTheme'
import BaseButton from '../ui/BaseButton.vue'
import BaseIcon from '../ui/BaseIcon.vue'

type ThemeIcon = 'sun' | 'moon' | 'monitor'

interface ThemeOption {
  value: Theme
  label: string
  icon: ThemeIcon
}

const { theme, setTheme } = useTheme()
const isOpen = ref(false)

const icon = computed<ThemeIcon>(() => {
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
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' },
  { value: 'system', label: 'System', icon: 'monitor' },
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
      <BaseIcon v-if="icon === 'sun'" size="md" decorative>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </BaseIcon>
      <BaseIcon v-else-if="icon === 'moon'" size="md" decorative>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </BaseIcon>
      <BaseIcon v-else size="md" decorative>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </BaseIcon>
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
          <BaseIcon v-if="option.icon === 'sun'" size="sm" decorative>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
          </BaseIcon>
          <BaseIcon v-else-if="option.icon === 'moon'" size="sm" decorative>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </BaseIcon>
          <BaseIcon v-else size="sm" decorative>
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </BaseIcon>
          <span>{{ option.label }}</span>
          <BaseIcon v-if="theme === option.value" size="sm" class="ml-auto text-musgo-500" decorative>
            <polyline points="20 6 9 17 4 12" />
          </BaseIcon>
        </button>
      </div>
    </Transition>
  </div>
</template>
