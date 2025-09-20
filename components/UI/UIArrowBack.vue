<script setup>
  defineProps({
    variant: { type: String, default: 'alternate', validator: (value) => {
      return ['primary', 'secondary', 'danger', 'alternate'].includes(value)
    }}
  })

  const router = useRouter()

  function back() {
    if (router.options.history.state.back) {
      router.back()
    } else {
      router.go(-1)
    }
  }
</script>

<template>
  <div :class="[$style.box, $style[`variant_${variant}`]]">
    <IconUilArrowLeft @click="back" :class="$style.icon"/>
  </div>
</template>

<style module>
  .box {
    border-radius: var(--base-border-radius);
    cursor: pointer;
    padding: 6px;
    transition: background .3s;
    white-space: nowrap;
  }

  .variant_primary {
    background: var(--button-primary-color-background);
    border-color: var(--button-primary-color-border);
  }
  
  .variant_primary .icon path {
    fill: var(--button-primary-color-text);
  }
  
  .variant_primary:hover {
    background-color: var(--button-primary-color-background-hover);
  }

  .variant_secondary {
    background: var(--button-secondary-color-background);
    border-color: var(--button-secondary-color-border);
  }
  
  .variant_secondary .icon path {
    fill: var(--button-secondary-color-text);
  }
  
  .variant_secondary:hover {
    background-color: var(--button-secondary-color-background-hover);
  }

  .variant_alternate {
    background: var(--button-alternate-color-background);
    border-color: var(--button-alternate-color-border);
  }
  
  .variant_alternate .icon path {
    fill: var(--button-alternate-color-text);
  }
  
  .variant_alternate:hover {
    background-color: var(--button-alternate-color-background-hover);
  }
</style>