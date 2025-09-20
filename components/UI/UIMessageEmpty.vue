<script setup>
  defineProps({
    hideButtonReload: { type: Boolean }
  })

  const emit = defineEmits(['reload'])
</script>

<template>
  <div :class="$style.message_empty">
    <li><slot/></li>
    <UIButton @click="emit('reload')" v-if="!hideButtonReload" variant="alternate" isSmall>Recargar</UIButton>
  </div>
</template>

<style module>
  .message_empty {
    margin: 0 auto;
    max-width: 768px;
    padding: 32px min(32px, 5%);
    text-align: center;
  }

  .message_empty li {
    margin-bottom: 16px;
  }
</style>