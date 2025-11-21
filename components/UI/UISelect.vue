<script setup>
  import { onClickOutside } from '@vueuse/core'

  const props = defineProps({
    options: { type: [Array, Boolean], default: ([]) },
    optionsUp: { type: Boolean, default: false },
    placeholder: { type: String, default: 'Seleccionar' },
    label: { type: String },
    isDisabled: { type: Boolean }
  })

  const selected = defineModel({ type: [String, Object, Boolean] })
  const emit = defineEmits(['change', 'blur'])

  const isDrop = ref(false)
  const selectRef = ref(null)

  onClickOutside(selectRef, () => {
    if (isDrop.value) {
      emit('blur')
    }
    isDrop.value = false
  })

  const handleSelect = (value, index) => {
    emit('change', { ...value, index })
    selected.value = value
    isDrop.value = false
  }
</script>

<template>
  <div>
    <label v-if="label" style="margin-bottom: 6px;">{{ label }}</label>
    <div :class="[$style.select, {[$style.select_drop]: isDrop}, {[$style.disabled]: isDisabled}]" ref="selectRef">
      <div @click="isDisabled ? ()=>{} : isDrop = !isDrop" :class="$style.trigger">
        <input type="text" :placeholder readonly :value="selected?.text || selected?.nombre" :disabled="isDisabled">
        <IconUilAngleDown size="24" color="var(--select-color-border)"/>
      </div>
  
      <div :class="[$style.options, $style[optionsUp ? 'options_up' : 'options_down']]">
        <li v-if="options?.length === 0" :class="$style.option"><i>Sin opciones</i></li>
        <li @click="handleSelect($, i)" v-for="($, i) in options" :class="$style.option">{{ $?.text || $?.nombre }}</li>
      </div>
    </div>
  </div>
</template>

<style module>
  .select, .options {
    background-color: var(--select-color-background);
    border: 1px solid var(--select-color-border);
    border-radius: var(--base-border-radius);
  }

  .select {
    cursor: pointer;
    position: relative;
    transition: border .3s;
  }
  
  .select input {
    border: none;
    background-color: var(--select-color-background);
    /* background-color: red; */
    color: var(--select-color-text);
    height: 37px;
    margin: 1px 0 0 1px;
    outline: none;
    padding-right: 0;
    pointer-events: none;
    width: 100%;
  }
  
  .select:hover:not(.disabled), .select_drop {
    border-color: var(--select-color-border-focus);
  }

  .select.disabled {
    border-style: dashed;
    cursor: not-allowed;
    /* pointer-events: none; */
  }

  .select_drop .options {
    opacity: 1;
    pointer-events: visible;
  }
  
  .select_drop .options_down {
    margin-top: 8px;
  }

  .select_drop .options_up {
    margin-bottom: 8px;
  }

  .trigger, .options {
    display: grid;
  }
  
  .trigger {
    align-items: center;
    gap: 8px;
    grid-template-columns: 1fr 32px;
  }

  .options {
    left: 0;
    max-height: 208px;
    opacity: 0;
    overflow-x: hidden;
    overflow-y: auto;
    pointer-events: none;
    position: absolute;
    right: 0;
    transition: margin .3s, opacity .3s;
    z-index: 11;
  }
  
  .options_down {
    top: 100%;
  }

  .options_up {
    top: unset;
    bottom: 100%;
  }

  .option {
    padding: 8px 16px;
  }
  
  .option:hover {
    background-color: var(--select-color-option-hover);
  }

  .option:first-child {
    padding-top: 16px;
  }

  .option:last-child {
    padding-bottom: 16px;
  }
</style>