<script setup>
  const props = defineProps({
    placeholder: { type: String, default: String() },
    holder: { type: String, default: String() },
    isDisabled: { type: Boolean, default: false },
    type: { type: String, default: 'text' },
    name: { type: String },
    min: { type: [Number, String] },
    max: { type: [Number, String] },
    label: { type: String },
    title: { type: [Boolean, String] }
  })

  const placeholderFocus = ref(`${props.placeholder} ${props.holder}`)

  const value = defineModel({ type: [String, Number] })
  const emit = defineEmits(['input', 'blur'])

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
</script>

<template>
  <div :class="$style.input">
    <label v-if="label">{{ label }}</label>
    <input @focus="label ? ()=> {} : focus" @blur="blur" @input="isDisabled ? () => {} : emit('input', $event.target.value)" :type :placeholder="placeholderFocus" v-model="value" :disabled="isDisabled" :name :title="title === true ? placeholder : (title || undefined)" :min :max>
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
  
  .input input {
    background-color: var(--input-color-background);
    border-color: var(--input-color-border);
    color: var(--input-color-text);
    line-height: 40px;
    width: 100%;
  }

  .input input[disabled] {
    border-style: dashed;
  }

  .input input:focus {
    border-color: var(--input-color-border-focus);
    background-color: var(--input-color-background-focus);
  }
</style>