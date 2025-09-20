<script setup>
  const options = defineModel({ type: Array })

  function select(index) {
    options.value[index].selected = !options.value[index].selected
  }
</script>

<template>
  <div :class="$style.options">
    <div v-for="($, i) in options" :key="i" :class="[$style.check, {[$style.selected]: $.selected}]">
      <div @click="select(i)" :class="$style.check_button"/>
      <span>{{ $.text }}</span>
    </div>
  </div>
</template>

<style module>
  .options {
    gap: 16px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(144px, 1fr));
  }

  .check {
    align-items: center;
    display: grid;
    gap: 12px;
    grid-template-columns: max-content 1fr;
    transition: border .3s;
  }

  .check.selected {
    /* border-color: var(--color-primary); */
  }

  .check.selected .check_button {
    /* border-color: var(--color-primary-highlight); */
  }

  .check.selected .check_button::before {
    /* background-color: var(--color-primary); */
    content: '';
    display: block;
    margin: 2px;
    position: relative;
    height: 8px;
    width: 8px;
  }

  .check_button {
    /* border: 2px solid var(--color-border-highlight); */
    box-sizing: content-box;
    cursor: pointer;
    height: 12px;
    position: relative;
    width: 12px;
  }

  .check_button:hover {
    /* border-color: var(--color-border-main); */
  }
</style>