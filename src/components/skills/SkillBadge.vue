<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseBadge from '../ui/BaseBadge.vue'

interface SkillBadgeProps {
  label: string
  category?: string
}

const props = withDefaults(defineProps<SkillBadgeProps>(), {
  category: 'frontend',
})

const { t } = useI18n()

const resolvedLabel = computed<string>(() => t(`skills.items.${props.label}`))
</script>

<template>
  <BaseBadge variant="neutral" size="regular" shape="rounded">
    {{ resolvedLabel }}
  </BaseBadge>
</template>
