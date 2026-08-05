import { ref, onMounted, type Ref } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'portfolio-theme'
const VALID_THEMES: readonly Theme[] = ['light', 'dark', 'system'] as const

const isTheme = (value: string | null): value is Theme =>
  value !== null && (VALID_THEMES as readonly string[]).includes(value)

const theme: Ref<Theme> = ref('system')

const setTheme = (newTheme: Theme): void => {
  theme.value = newTheme
  localStorage.setItem(STORAGE_KEY, newTheme)
  applyTheme(newTheme)
}

const applyTheme = (themeValue: Theme): void => {
  const body = document.body

  if (themeValue === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    body.classList.toggle('dark', prefersDark)
  } else {
    body.classList.toggle('dark', themeValue === 'dark')
  }
}

const cycleTheme = (): void => {
  const currentIndex = VALID_THEMES.indexOf(theme.value)
  const nextIndex = (currentIndex + 1) % VALID_THEMES.length
  const next = VALID_THEMES[nextIndex]
  if (next) {
    setTheme(next)
  }
}

const getSystemTheme = (): 'light' | 'dark' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const isDark = (): boolean => {
  if (theme.value === 'system') {
    return getSystemTheme() === 'dark'
  }
  return theme.value === 'dark'
}

const initTheme = (): void => {
  const stored = localStorage.getItem(STORAGE_KEY)
  theme.value = isTheme(stored) ? stored : 'system'
  applyTheme(theme.value)
}

export function useTheme() {
  onMounted(() => {
    initTheme()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (theme.value === 'system') {
        applyTheme('system')
      }
    })
  })

  return {
    theme,
    setTheme,
    cycleTheme,
    isDark,
    getSystemTheme,
  }
}

export type ThemeApi = ReturnType<typeof useTheme>
