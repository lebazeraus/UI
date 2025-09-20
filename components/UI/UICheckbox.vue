<script setup>
  defineProps({
    isLoading: { type: Boolean },
    isCapitalize: { type: Boolean },
    isDisabled: { type: Boolean }
  })

  const isChecked = defineModel({ type: Boolean })
</script>

<template>
  <div :class="$style.checkbox">
    <UIButtonSlot @click="isDisabled ? ()=>{} : isChecked = !isChecked" :isDisabled>
      <UISpinner v-if="isLoading" size="16"/>
      <IconUilCheckSquare v-else-if="isChecked" size="20" color="var(--checkbox-color-selected)"/>
      <IconUilSquare v-else size="20" color="var(--checkbox-color)"/>
    </UIButtonSlot>
    <li :class="{[$style.capitlize]: isCapitalize}"><slot/></li>
  </div>
</template>

<style module>
  .checkbox {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 4px;
  }

  .capitlize {
    text-transform: capitalize;
  }
</style>