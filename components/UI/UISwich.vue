<script setup>
  const props = defineProps({
    isDisabled: { type: Boolean },
    isUpdating: { type: Boolean }
  })

  const toggle = defineModel({ type: Boolean })
  const emit = defineEmits(['change'])

  function change() {
    if (props.isDisabled || props.isUpdating) {
      return false
    }
    toggle.value = !toggle.value
    emit('change', toggle.value)
  }
</script>

<template>
  <div :class="[$style.swich, {[$style.swich_active]: toggle, [$style.swich_disabled]: isDisabled || isUpdating}]">
    <UISpinner v-if="isUpdating" size="16" :class="$style.swich_spinner"/>
    <div @click="change" :class="$style.swich_notch">.</div>
  </div>
</template>

<style module>
  .swich {
    background-color: var(--swich-color-background);
    border-radius: var(--base-border-radius);
    height: 20px;
    position: relative;
    transition: background .3s;
    width: 38px;
  }

  .swich_notch, .swich_spinner {
    position: absolute;
    top: 1px;
  }
  
  .swich_notch {
    background-color: var(--swich-color-notch);
    border-radius: var(--base-border-radius);
    cursor: pointer;
    height: 16px;
    left: 2px;
    top: 2px;
    transition: left .3s;
    width: 16px;
  }

  .swich_spinner {
    left: 19px;
  }

  .swich_active .swich_notch {
    background-color: var(--swich-color-notch-active);
    left: 20px;
  }

  .swich_active .swich_spinner {
    left: 1px;
  }

  .swich_disabled {
    cursor: not-allowed;
  }

  .swich_disabled .swich_notch {
    opacity: .72;
    pointer-events: none;
  }
</style>