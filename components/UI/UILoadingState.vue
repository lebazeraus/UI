<script setup>
  defineProps({
    status: { type: String },
    isEmpty: { type: Boolean },
    emptyMessage: { type: String },
    showButtonBack: { type: Boolean },
    showButtonRefresh: { type: Boolean }
  })

  const emit = defineEmits(['refresh'])
</script>

<template>
  <div :class="$style.ui_loading_state">
    <div v-if="isEmpty">
      <li>{{ emptyMessage }}</li>
      <div :class="$style.buttons" v-if="showButtonBack || showButtonRefresh">
        <UIButton v-if="showButtonBack" @click="$back" variant="alternate" isSmall>Volver</UIButton>
        <UIButton v-if="showButtonRefresh" @click="emit('refresh')" variant="secondary" isSmall>Recargar</UIButton>
      </div>
    </div>
    <UISpinner padding="32" v-else-if="status === 'pending' || status === 'infinity'"/>
  </div>
</template>

<style module>
  .ui_loading_state {
    display: grid;
    margin: 0 auto;
    max-width: 768px;
    padding: 32px min(32px, 5%);
    row-gap: 16px;
    text-align: center;
  }

  .buttons {
    justify-content: center;
    column-gap: 16px;
    display: flex;
    margin-top: 16px;
  }
</style>