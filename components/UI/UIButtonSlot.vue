<script setup>
  defineProps({
    variant: { type: String, default: 'alternate', validator: (value) => {
      return ['primary', 'secondary', 'danger', 'alternate'].includes(value)
    }},
    isDisabled: { type: Boolean }
  })

</script>

<template>
  <div :class="[$style.box, $style[`variant_${variant}`], {[$style.disabled]: isDisabled}]">
    <slot/>
  </div>
</template>

<style module>
  .box {
    border-radius: var(--base-border-radius);
    cursor: pointer;
    padding: 6px;
    transition: background .3s, filter .3s;
    white-space: nowrap;
  }

  .box.disabled {
    cursor: not-allowed;
  }
  
  .variant_primary:hover:not(.disabled) {
    background-color: var(--button-primary-color-background-hover);
  }
  
  .variant_secondary:hover:not(.disabled) {
    background-color: var(--button-secondary-color-background-hover);
  }

  .variant_alternate:hover:not(.disabled) {
    background-color: var(--button-alternate-color-background-hover);
    filter: brightness(.96);
  }

  .variant_danger:hover:not(.disabled) {
    background-color: var(--button-danger-color-background-hover);
  }
</style>