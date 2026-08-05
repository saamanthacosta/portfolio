<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '../ui/BaseButton.vue'
import { getLocale, setLocale, type Locale } from '../../i18n'

interface LocaleOption {
  value: Locale
  flag: string
  code: string
  label: string
}

const { t } = useI18n()

const options: readonly LocaleOption[] = [
  { value: 'en', flag: '🇺🇸', code: 'EN-US', label: 'English' },
  { value: 'pt-BR', flag: '🇧🇷', code: 'PT-BR', label: 'Português' },
] as const

const isOpen = ref(false)
const activeIndex = ref(0)
const menuRef = ref<HTMLUListElement | null>(null)
const triggerRef = ref<InstanceType<typeof BaseButton> | null>(null)

const currentLocale = computed<Locale>(() => getLocale())
const currentOption = computed<LocaleOption>(
  () => options.find((o) => o.value === currentLocale.value) ?? options[0]!,
)

const triggerLabel = computed<string>(() =>
  t('accessibility.languageToggle'),
)

const close = (): void => {
  isOpen.value = false
  activeIndex.value = 0
}

const toggle = async (event: MouseEvent): Promise<void> => {
  event.stopPropagation()
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    await nextTick()
    const idx = options.findIndex((o) => o.value === currentLocale.value)
    activeIndex.value = idx >= 0 ? idx : 0
    focusItem(activeIndex.value)
  }
}

const select = (locale: Locale): void => {
  setLocale(locale)
  close()
  triggerRef.value?.$el?.focus()
}

const focusItem = (index: number): void => {
  const items = menuRef.value?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')
  items?.[index]?.focus()
}

const onMenuKeydown = (event: KeyboardEvent): void => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % options.length
      focusItem(activeIndex.value)
      break
    case 'ArrowUp':
      event.preventDefault()
      activeIndex.value = (activeIndex.value - 1 + options.length) % options.length
      focusItem(activeIndex.value)
      break
    case 'Home':
      event.preventDefault()
      activeIndex.value = 0
      focusItem(activeIndex.value)
      break
    case 'End':
      event.preventDefault()
      activeIndex.value = options.length - 1
      focusItem(activeIndex.value)
      break
    case 'Escape':
      event.preventDefault()
      close()
      triggerRef.value?.$el?.focus()
      break
    case 'Tab':
      close()
      break
  }
}

const onTriggerKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (!isOpen.value) {
      isOpen.value = true
    }
  } else if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault()
    close()
  }
}

const onDocumentClick = (event: MouseEvent): void => {
  if (!isOpen.value) return
  const target = event.target as Node | null
  if (target && !menuRef.value?.parentElement?.contains(target)) {
    close()
  }
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('click', onDocumentClick)
  } else {
    document.removeEventListener('click', onDocumentClick)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <div class="relative">
    <BaseButton
      ref="triggerRef"
      variant="icon"
      :aria-label="triggerLabel"
      :title="triggerLabel"
      :aria-haspopup="'menu'"
      :aria-expanded="isOpen"
      aria-controls="language-menu"
      @click="toggle"
      @keydown="onTriggerKeydown"
    >
      <span class="text-xl leading-none" aria-hidden="true">{{ currentOption.flag }}</span>
      <span class="sr-only">{{ currentOption.label }}</span>
    </BaseButton>

    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <ul
        v-if="isOpen"
        id="language-menu"
        ref="menuRef"
        role="menu"
        aria-label="Select language"
        @click.stop
        @keydown="onMenuKeydown"
        class="absolute right-0 mt-2 w-44 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 py-2 z-50 focus:outline-none"
      >
        <li
          v-for="(option, index) in options"
          :key="option.value"
          role="none"
        >
          <button
            type="button"
            role="menuitem"
            tabindex="-1"
            :aria-selected="option.value === currentLocale"
            :aria-label="option.label"
            @click="select(option.value)"
            @mouseenter="activeIndex = index"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-100 cursor-pointer focus:outline-none focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-700"
            :class="option.value === currentLocale
              ? 'text-musgo-600 dark:text-musgo-400 bg-musgo-50 dark:bg-musgo-900/30'
              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'"
          >
            <span class="text-xl leading-none" aria-hidden="true">{{ option.flag }}</span>
            <span class="font-medium">{{ option.code }}</span>
            <span class="ml-auto text-xs text-zinc-500 dark:text-zinc-400">{{ option.label }}</span>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>
