<script setup>
  defineProps({
    size: { type: [String, Number], default: 24 },
    padding: { type: [String, Number], default: 2 }
  })
</script>

<template>
  <div :class="$style.container" :style="{ 
    padding: padding + 'px',
    width: (Number(size) + Number(padding) * 2) + 'px',
    height: (Number(size) + Number(padding) * 2) + 'px'
  }">
    <svg :class="$style.spinner" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24">
      <g>
        <circle cx="3" cy="12" r="2"></circle>
        <circle cx="21" cy="12" r="2"></circle>
        <circle cx="12" cy="21" r="2"></circle>
        <circle cx="12" cy="3" r="2"></circle>
        <circle cx="5.64" cy="5.64" r="2"></circle>
        <circle cx="18.36" cy="18.36" r="2"></circle>
        <circle cx="5.64" cy="18.36" r="2"></circle>
        <circle cx="18.36" cy="5.64" r="2"></circle>
        <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
      </g>
    </svg>
  </div>
</template>

<style module>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin: 0 auto;
  }
  
  .spinner {
    display: block;
    width: 100%;
    height: 100%;
  }
  
  .spinner circle {
    fill: var(--color-secondary);
  }
</style>