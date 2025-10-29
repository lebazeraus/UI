<script setup>
  const props = defineProps({
    options: { type: Array }
  })

  const emit = defineEmits(['select'])

  const indexTabSelected = defineModel({ type: Number })

  function select($, i) {
    emit('select', { index: i, ...$ })
    indexTabSelected.value = i
  }
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.tabs">
      <li @click="select($, i)" v-for="($, i) in options" :key="i" :class="[$style.option, {[$style.selected]: indexTabSelected === i}]">
        {{ $.text }}
      </li>
    </div>
  </div>
</template>

<style module>
  .container {
    display: grid;
    width: 100%;
  }

  .tabs {
    background-color: var(--tabs-color-background);
    border: 1px solid var(--tabs-color-border);
    border-radius: var(--base-border-radius);
    display: flex;
    gap: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 2px;
    width: 100%;
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }

  .option {
    border-radius: var(--base-border-radius);
    color: var(--tabs-color-option-text);
    cursor: pointer;
    display: inline;
    padding: 6.5px 8px;
    transition: background-color .3s, color .3s;
  }

  .option:hover {
    background-color: var(--tabs-color-option-hover);
  }

  .option.selected {
    background-color: var(--tabs-color-option-selected);
    color: var(--tabs-color-option-text-selected);
  }
</style>