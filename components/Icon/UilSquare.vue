<script setup>
  defineProps({
    color: { type: String, default: 'var(--color-secondary)' },
    size: { type: [Number, String], default: 24 }
  })
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24"><path :fill="color" d="M21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-1 18H4V4h16Z"></path></svg>
</template>