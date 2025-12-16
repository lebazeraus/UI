<script setup>
  const props = defineProps({
    autocomplete: { type: String },
    placeholder: { type: String, default: String() },
    holder: { type: String, default: String() },
    isDisabled: { type: Boolean, default: false },
    type: { type: String, default: 'text' },
    name: { type: String },
    min: { type: [Number, String] },
    max: { type: [Number, String] },
    label: { type: String },
    title: { type: [Boolean, String] },
    clearable: { type: Boolean, default: false }
  })

  const placeholderFocus = ref(`${props.placeholder} ${props.holder}`)
  const value = defineModel({ type: [String, Number] })
  const emit = defineEmits(['input', 'blur', 'clear'])

  const focus = () => {
    if (props.placeholder) {
      placeholderFocus.value = `Ingrese ${props.placeholder.toLowerCase()}`
    }
  }

  const blur = () => {
    if (!props.placeholder) {
      placeholderFocus.value = `${props.placeholder} ${props.holder}`
    }
    emit('blur')
  }

  const clearInput = () => {
    value.value = ''
    emit('clear')
  }

  const hasValue = computed(() => {
    return value.value !== '' && value.value !== null && value.value !== undefined
  })
</script>

<template>
  <div :class="$style.input">
    <label v-if="label">{{ label }}</label>
    <div :class="$style.input_wrapper">
      <input @focus="label ? () => {} : focus" @blur="blur" @input="isDisabled ? () => {} : emit('input', $event.target.value)" :type :placeholder="placeholderFocus" v-model="value" :disabled="isDisabled" :name="props.name" :title="title === true ? placeholder : (title || undefined)" :min :max :autocomplete>
      <UIButtonSlot v-if="clearable && hasValue && !isDisabled" @click="clearInput" :class="$style.clear_button" :is-disabled="isDisabled" variant="alternate">
        <IconUilTimes :size="16"/>
      </UIButtonSlot>
    </div>
  </div>
</template>

<style module>
  .input {
    position: relative;
    transition: border .3s;
  }

  .input label {
    margin-bottom: 6px;
  }

  .input_wrapper {
    position: relative;
  }

  .input_wrapper input {
    background-color: var(--input-color-background);
    border-color: var(--input-color-border);
    color: var(--input-color-text);
    line-height: 40px;
    padding-right: 40px;
    width: 100%;
  }

  .input_wrapper input[disabled] {
    border-style: dashed;
  }

  .input_wrapper input:focus {
    background-color: var(--input-color-background-focus);
    border-color: var(--input-color-border-focus);
  }

  .clear_button {
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
