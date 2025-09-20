<script setup>
  defineProps({
    variant: { type: String, default: 'default', validator: (value) => {
      return ['red', 'green', 'blue', 'gray', 'white', 'default'].includes(value)
    }},
    isCenter: { type: Boolean }
  })
</script>

<template>
  <span :class="[$style.Badg, $style[variant], {[$style.center]: isCenter}]"><slot/></span>
</template>

<style module>
  .Badg {
    border-radius: var(--base-border-radius);
    color: var(--badg-color-text);
    display: block;
    min-width: 32px;
    padding: 4px 8px;
  }

  .Badg.center {
    text-align: center;
  }

  .Badg.default {
    background-color: var(--badg-color-background-default);
    color: var(--badg-color-text-default);
  }

  .gray {
    background-color: var(--badg-color-background-gray);
  }

  .red {
    background-color: var(--badg-color-background-red);
  }

  .green {
    background-color: var(--badg-color-background-green);
  }

  .blue {
    background-color: var(--badg-color-background-blue);
  }

  .Badg.white {
    background-color: var(--badg-color-background-white);
    color: var(--badg-color-text-default);
  }
</style>