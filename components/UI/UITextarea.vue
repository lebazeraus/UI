<script setup>
  const props = defineProps({
    placeholder: { type: String, default: String() },
    holder: { type: String, default: String() },
    isDisabled: { type: Boolean, default: false },
    type: { type: String, default: 'text' },
    name: { type: String },
    label: { type: String },
    title: { type: [Boolean, String] },
    max: { type: [String, Number] },
    autoResize: { type: Boolean, default: false }, // Nueva propiedad para activar resize automático
    minHeight: { type: [String, Number], default: 80 }, // Altura mínima en px
    maxHeight: { type: [String, Number], default: 768 } // Altura máxima en px
  })

  const placeholderFocus = ref(`${props.placeholder} ${props.holder}`)
  const textareaRef = ref(null)

  const value = defineModel({ type: [String, Number] })
  const emit = defineEmits(['input'])

  function focus(b) {
    placeholderFocus.value = b && props.placeholder ? `Ingrese ${props.placeholder.toLowerCase()}` : `${props.placeholder} ${props.holder}`
  }

  function handleInput(event) {
    if (!props.isDisabled) {
      emit('input', event.target.value)
      
      // Auto-resize solo si la propiedad está activada
      if (props.autoResize) {
        autoResize()
      }
    }
  }

  function autoResize() {
    if (!textareaRef.value) return

    const textarea = textareaRef.value
    
    // Resetear altura para obtener la altura correcta del scroll
    textarea.style.height = 'auto'
    
    // Calcular nueva altura
    const scrollHeight = textarea.scrollHeight
    const minHeight = typeof props.minHeight === 'number' ? props.minHeight : parseInt(props.minHeight)
    const maxHeight = typeof props.maxHeight === 'number' ? props.maxHeight : parseInt(props.maxHeight)
    
    // Aplicar altura entre min y max
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight)
    textarea.style.height = newHeight + 'px'
    
    // Si alcanzó el máximo, mostrar scroll
    if (scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto'
    } else {
      textarea.style.overflowY = 'hidden'
    }
  }

  // Auto-resize cuando cambie el valor (por ejemplo, cuando se setee programáticamente)
  watch(value, () => {
    if (props.autoResize) {
      nextTick(() => {
        autoResize()
      })
    }
  })

  // Auto-resize inicial
  onMounted(() => {
    if (props.autoResize && value.value) {
      nextTick(() => {
        autoResize()
      })
    }
  })
</script>

<template>
  <div :class="$style.input">
    <label v-if="label">{{ label }}</label>
    <textarea 
      ref="textareaRef"
      @focus="label ? ()=> {} : focus(true)" 
      @blur="focus(false)" 
      @input="handleInput"
      :type 
      :placeholder="placeholderFocus" 
      v-model="value" 
      :disabled="isDisabled" 
      :name 
      :maxlength="max"
      :title="title === true ? placeholder : (title || undefined)"
      :class="{ [$style.autoResize]: autoResize }"
    ></textarea>
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
  
  .input textarea {
    background-color: var(--input-color-background);
    border-color: var(--input-color-border);
    color: var(--input-color-text);
    line-height: 1.5;
    width: 100%;
    resize: vertical; /* Permite resize manual */
    overflow-y: auto;
    transition: height 0.1s ease;
  }

  .input textarea.autoResize {
    resize: none; /* Desactiva resize manual cuando está en modo auto */
    overflow-y: hidden;
  }

  .input textarea[disabled] {
    border-style: dashed;
  }

  .input textarea:focus {
    border-color: var(--input-color-border-focus);
    background-color: var(--input-color-background-focus);
  }
</style>