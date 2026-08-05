<script setup lang="ts">
import BaseBadge from '../ui/BaseBadge.vue'

interface SkillBadgeProps {
  label: string
  category?: string
}

const props = withDefaults(defineProps<SkillBadgeProps>(), {
  category: 'frontend',
})
</script>

<template>
  <BaseBadge variant="neutral" size="regular" shape="rounded">
    {{ props.label }}
  </BaseBadge>
</template>
