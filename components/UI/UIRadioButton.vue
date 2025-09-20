<script setup>
  defineProps({
    isSelected: { type: Boolean },
    isLoading: { type: Boolean },
    isCapitalize: { type: Boolean },
    isDisabled: { type: Boolean }
  })

  const emit = defineEmits(['select'])
</script>

<template>
  <div :class="$style.radio_button">
    <UISpinner v-if="isLoading" size="20" without-padding/>
    <UIButtonSlot v-else @click="isDisabled ? ()=>{} : emit('select')" :isDisabled>
      <div :class="[$style.radio, {[$style.selected]: isSelected}]"/>
    </UIButtonSlot>
    <li :class="{[$style.capitlize]: isCapitalize}"><slot/></li>
  </div>
</template>

<style module>
  .radio_button {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 4px;
  }
  
  .capitlize {
    text-transform: capitalize;
  }

  .radio {
    background-color: var(--radio-color-background);
    border: 2px solid var(--radio-color-border);
    border-radius: 50%;
    box-sizing: content-box;
    height: 16px;
    position: relative;
    width: 16px;
  }

  .radio.selected {
    background-color: var(--radio-color-background-selected);
    border-color: var(--radio-color-border-selected);
  }

</style>