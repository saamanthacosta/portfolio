<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '../ui/BaseButton.vue'
import BaseIcon from '../ui/BaseIcon.vue'
import BaseTypography from '../ui/BaseTypography.vue'
import HibiscusFlower from './HibiscusFlower.vue'
import PetalLeaf from './PetalLeaf.vue'

interface FlowerPosition {
  variant: 1 | 2 | 3 | 4
  size: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  delay: number
}

interface LeafPosition {
  variant: 1 | 2 | 3 | 4 | 5
  size: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  delay: number
}

const { t } = useI18n()
const isMobile = ref(false)
const isTablet = ref(false)

onMounted(() => {
  const checkSize = () => {
    isMobile.value = window.innerWidth < 768
    isTablet.value = window.innerWidth >= 768 && window.innerWidth < 1024
  }
  checkSize()
  window.addEventListener('resize', checkSize)
})

const flowers = computed<FlowerPosition[]>(() => {
  if (isMobile.value) {
    return [
      { variant: 1, size: 80, bottom: '8%', left: '2%', delay: 200 },
      { variant: 2, size: 60, top: '90px', right: '4%', delay: 400 },
    ]
  }
  if (isTablet.value) {
    return [
      { variant: 1, size: 90, top: '90px', left: '2%', delay: 200 },
      { variant: 2, size: 70, top: '90px', right: '4%', delay: 400 },
      { variant: 3, size: 80, bottom: '8%', left: '3%', delay: 300 },
      { variant: 4, size: 75, bottom: '10%', right: '5%', delay: 500 },
    ]
  }
  return [
    { variant: 1, size: 90, top: '4%', left: '2%', delay: 200 },
    { variant: 2, size: 70, top: '6%', right: '4%', delay: 400 },
    { variant: 3, size: 80, bottom: '8%', left: '3%', delay: 300 },
    { variant: 4, size: 75, bottom: '10%', right: '5%', delay: 500 },
  ]
})

const leaves = computed<LeafPosition[]>(() => {
  if (isMobile.value) {
    return [
      { variant: 1, size: 28, top: '110px', left: '5%', delay: 200 },
      { variant: 2, size: 24, bottom: '30%', right: '5%', delay: 350 },
    ]
  }
  if (isTablet.value) {
    return [
      { variant: 1, size: 30, top: '90px', left: '32%', delay: 200 },
      { variant: 2, size: 26, top: '90px', right: '30%', delay: 350 },
      { variant: 3, size: 28, top: '45%', left: '0.5%', delay: 400 },
      { variant: 4, size: 22, top: '48%', right: '0.5%', delay: 250 },
    ]
  }
  return [
    { variant: 1, size: 30, top: '2%', left: '32%', delay: 200 },
    { variant: 2, size: 26, top: '2%', right: '30%', delay: 350 },
    { variant: 3, size: 28, top: '45%', left: '0.5%', delay: 400 },
    { variant: 4, size: 22, top: '48%', right: '0.5%', delay: 250 },
    { variant: 5, size: 26, bottom: '2%', left: '30%', delay: 300 },
    { variant: 1, size: 24, bottom: '2%', right: '32%', delay: 450 },
  ]
})

const getPosition = (config: FlowerPosition | LeafPosition): Record<string, string> => {
  const pos: Record<string, string> = {}
  if (config.top) pos.top = config.top
  if (config.bottom) pos.bottom = config.bottom
  if (config.left) pos.left = config.left
  if (config.right) pos.right = config.right
  return pos
}
</script>

<template>
  <section id="hero" class="min-h-dvh flex items-center justify-center relative overflow-hidden bg-zinc-50 dark:bg-zinc-950">
    <div
      v-for="(flower, index) in flowers"
      :key="`flower-${index}`"
      class="absolute pointer-events-none opacity-85 dark:opacity-75"
      :style="getPosition(flower)"
    >
      <HibiscusFlower
        :variant="flower.variant"
        :size="flower.size"
        :animation-delay="flower.delay"
      />
    </div>

    <div
      v-for="(leaf, index) in leaves"
      :key="`leaf-${index}`"
      class="absolute pointer-events-none opacity-70 dark:opacity-60"
      :style="getPosition(leaf)"
    >
      <PetalLeaf
        :variant="leaf.variant"
        :size="leaf.size"
        :animation-delay="leaf.delay"
      />
    </div>
    <div class="text-center z-10 max-w-5xl px-6 py-24 md:py-32 gap-2">
      <span class="inline-block bg-musgo-100 dark:bg-musgo-900 text-musgo-700 dark:text-musgo-300 px-4 py-2 rounded-full text-sm font-semibold">
        {{ t('hero.tag') }}
      </span>

      <BaseTypography as="h1" class="mt-2 flex flex-col md:flex-row gap-3">
        <span class="block">{{ t('hero.name') }}</span>
        <span class="block text-pink-600 dark:text-pink-400">{{ t('hero.lastName') }}</span>
      </BaseTypography>

      <BaseTypography as="large-body" variant="muted" class="mt-2 font-medium">
        {{ t('hero.role') }}
      </BaseTypography>

      <BaseTypography as="small-body" variant="muted">
        {{ t('hero.location') }}
      </BaseTypography>

      <BaseButton
       class="mt-8"
        element="a"
        href="#about"
        variant="primary"
        size="lg"
      >
        {{ t('hero.cta') }}
        <BaseIcon size="md" decorative>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </BaseIcon>
      </BaseButton>
    </div>
  </section>
</template>
