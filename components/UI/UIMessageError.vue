<script setup>
  import { onClickOutside, useClipboard } from '@vueuse/core'

  const el = ref(null)
  const error = defineModel({ type: Object })
  const route = useRoute()

  onClickOutside(el, () => {
    setTimeout(() => {
      error.value = null
    }, 700)
  })

  const { copy, copied, isSupported } = useClipboard()

  const copyError = () => {
    copy(`Error capturado en ${route.fullPath}\n`
      + new Date().toLocaleString() + '\n\n'
      + JSON.stringify({
        error: error.value?.data || error.value,
        params: route.params,
        query: route.query
    }))
  }
</script>

<template>
  <div v-if="error" ref="el">
    <div :class="$style.error">
      <span :class="$style.error_text">{{ error?.data?.message || error?.message }}</span>
      <DevOnly>
        <span :class="$style.error_text">{{ error?.data || error }}</span>
      </DevOnly>

      <div v-if="isSupported" :class="$style.error_footer">
        <UIButtonSlot @click="copyError" variant="danger" :isDisabled="copied">
          <IconUilCheckCircle v-if="copied" size="20" color="var(--color-red-text)"/>
          <IconUilCopy v-else size="20" color="var(--color-red-text)"/>
        </UIButtonSlot>
      </div>
    </div>
  </div>
</template>

<style module>
  .error, .error_footer {
    display: grid;
  }

  .error {
    background-color: var(--color-red-background);
    border: 1px dashed var(--color-red-border);
    border-radius: var(--base-border-radius);
    margin: 8px;
    padding: 16px;
    row-gap: 16px;
  }
  
  .error_text {
    color: var(--color-red-text);
    max-width: 768px;
    word-break: break-word;
  }
  
  .error_footer {
    justify-content: end;
  }
</style>