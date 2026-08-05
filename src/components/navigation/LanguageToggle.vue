<script setup lang="ts">
import { computed } from 'vue'
import { getLocale, cycleLocale } from '../../i18n'

const currentLocale = computed(() => getLocale())

const label = computed<string>(() =>
  currentLocale.value === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês',
)
</script>

<template>
  <button
    class="min-w-11 h-11 px-3 flex items-center justify-center rounded-lg transition-colors duration-150 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-mono text-sm font-semibold tracking-wide"
    @click="cycleLocale"
    :aria-label="label"
    :title="label"
  >
    {{ currentLocale === 'en' ? 'EN' : 'PT' }}
  </button>
</template>
