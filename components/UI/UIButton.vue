<script setup>
  const props = defineProps({
    isAnimate: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
    variant: { type: String, default: 'primary', validator: (value) => {
      return ['primary', 'secondary', 'danger', 'alternate'].includes(value)
    }},
    isFull: { type: Boolean, default: false },
    isSmall: { type: Boolean, default: false }
  })

  const emit = defineEmits(['click'])

  function handleClick(event) {
    if (!props.isDisabled) {
      emit('click', event)
    }
  }
</script>

<template>
  <button @click="handleClick" :disabled="isDisabled" :aria-disabled="isDisabled" v-bind="$attrs" :class="[
    $style.button,
    $style[`variant_${variant}`],
    {
      [$style.is_animate]: isAnimate,
      [$style.is_disabled]: isDisabled,
      [$style.is_full]: isFull,
      [$style.is_small]: isSmall
    }]">
    <slot/>
  </button>
</template>

<style module>
  @keyframes animate-button {
    0% {
      transform: translateX(50%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(50%);
    }
  }

  .button {
    cursor: pointer;
    transition: background .3s;
    white-space: nowrap;
  }

  .variant_primary {
    background: var(--button-primary-color-background);
    border-color: var(--button-primary-color-border);
    color: var(--button-primary-color-text);
  }
  
  .variant_primary:hover:not([disabled]) {
    background-color: var(--button-primary-color-background-hover);
  }
  
  .variant_primary.is_disabled {
    background-color: var(--button-primary-color-background-disabled);
  }

  .variant_secondary {
    background: var(--button-secondary-color-background);
    border-color: var(--button-secondary-color-border);
    color: var(--button-secondary-color-text);
  }
  
  .variant_secondary:hover:not([disabled]) {
    background-color: var(--button-secondary-color-background-hover);
  }
  
  .variant_secondary.is_disabled {
    background-color: var(--button-secondary-color-background-disabled);
  }

  .variant_alternate {
    background: var(--button-alternate-color-background);
    border-color: var(--button-alternate-color-border);
    color: var(--button-alternate-color-text);
  }
  
  .variant_alternate:hover:not([disabled]) {
    background-color: var(--button-alternate-color-background-hover);
  }
  
  .variant_alternate.is_disabled {
    background-color: var(--button-alternate-color-background-disabled);
  }

  .variant_danger {
    background: var(--button-danger-color-background);
    border-color: var(--button-danger-color-border);
    color: var(--button-danger-color-text);
  }
  
  .variant_danger:hover:not([disabled]) {
    background-color: var(--button-danger-color-background-hover);
  }
  
  .variant_danger.is_disabled {
    background-color: var(--button-danger-color-background-disabled);
  }

  .is_animate {
    pointer-events: none;
  }

  .is_animate::before {
    animation: animate-button 6s linear infinite;
    background-image: linear-gradient(-45deg, rgba(255,255,255, 16%) 25%, transparent 25%, transparent 50%, rgba(255,255,255, 16%) 50%, rgba(255,255,255, 16%) 75%, transparent 75%, transparent);
    background-size: 96px 96px;
    content: "";
    height: 100%;
    top: 0;
    left: -200%;
    position: absolute;
    width: 200%;
  }

  button.is_full {
    width: 100%;
  }

  button.is_small {
    border-radius: 7px;
    border-width: 1px;
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
  }

  button[disabled] {
    border-style: dashed;
  }
</style>