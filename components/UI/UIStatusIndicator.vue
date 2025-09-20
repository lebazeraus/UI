<script setup>
  const { status } = defineProps({
    status: { type: String },
    contextWord: { type: String },
    error: { type: Object },
    isEmpty: { type: Boolean },
    isSuccess: { type: Boolean }
  })
</script>

<template>
  <div :class="$style.status">
    <IconUilCheckCircle v-if="status === 'success' && isSuccess" color="green" style="display: block; margin: 0 auto;"/>
    <UISpinner v-if="status === 'pending'"/>
    <div v-if="isEmpty" :class="[$style.message, $style.is_empty]">
      <IconUilInbox size="32"/>
      <li>No hay {{ contextWord || 'contenido' }} disponible.</li>
      <slot/>
    </div>

    <div v-if="error" :class="[$style.message, $style.is_error]">
      <IconUilCloudTimes size="32"/>
      <li>{{ error?.data?.message || 'Error desconocido' }}</li>
      <slot/>
      <DevOnly>
        <span :class="$style.pre">{{ error?.data }}</span>
      </DevOnly>
    </div>
  </div>
</template>

<style module>
  .status:empty {
    display: none;
  }

  .message {
    border-radius: var(--base-border-radius);
    display: grid;
    justify-items: center;
    gap: 16px;
    padding: min(32px, 5%);
  }
  
  .message li, .message svg path {
    color: hsla(0, 0%, 100%, 0.72);
    fill: hsla(0, 0%, 100%, 0.72);
    text-align: center;
  }
  
  .message button {
    border: none;
    color: hsla(0, 0%, 100%, 0.72);
    cursor: pointer;
  }

  .message.is_empty {
    background-color: hsla(240, 100%, 55%, 16%);
  }
  
  .message.is_error {
    background-color: hsl(0, 100%, 55%, 16%);
  }

  .pre {
    border-radius: 8px;
    color: hsl(0, 100%, 90%);
    font-family: 'Roboto Mono', sans-serif;
    font-size: 12px;
    max-height: 640px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 16px;
    white-space: pre-wrap;
    word-break: break-all;
  }
</style>