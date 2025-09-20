<script setup>
  const options = defineModel({ type: Array })

  function select(index) {
    options.value.forEach(($, i) => {
      $.selected = i === index
    })
  }
</script>

<template>
  <div :class="$style.options">
    <div @click="select(i)" v-for="($, i) in options" :key="i" :class="[$style.radio, {[$style.selected]: $.selected}]" :tabindex="i">
      <div :class="$style.radio_button"/>
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

  .radio {
    align-items: center;
    /* border: 1px solid var(--color-border-main); */
    border-radius: 8px;
    cursor: pointer;
    display: grid;
    gap: 12px;
    grid-template-columns: max-content 1fr;
    padding: 12px 16px;
    transition: border .3s;
  }

  .radio:hover {
    /* border-color: var(--color-border-hover); */
  }

  .radio:focus {
    border-style: dashed;
  }

  .radio.selected {
    /* border-color: var(--color-primary); */
  }

  .radio.selected .radio_button {
    /* background-color: var(--color-primary); */
    /* border-color: var(--color-primary-highlight); */
  }

  .radio_button {
    /* border: 2px solid var(--color-border-highlight); */
    border-radius: 50%;
    box-sizing: content-box;
    height: 12px;
    position: relative;
    width: 12px;
  }
</style>