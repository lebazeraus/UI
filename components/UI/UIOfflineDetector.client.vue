<script setup>
  const show = ref(false)
  const hideText = ref(false)

  const online = () => {
    show.value = false
    setTimeout(() => {
      hideText.value = false
    }, 1e3)
  }

  const offline = () => {
    show.value = true
    
    setTimeout(() => {
      hideText.value = true
    }, 7e3)
  }

  window.addEventListener('online', online)
  window.addEventListener('offline', offline)

  if (!navigator.onLine) {
    offline()
  }
</script>

<template>
  <div :class="[$style.ui_offline_detector, {[$style.show]: show}]">
    <IconUilWifiSlash v-if="hideText" color="white" size="18"/>
    <span v-else>Sin conexión a internet</span>
  </div>
</template>

<style module>
  .ui_offline_detector {
    background-color: rgba(192, 0, 0, 0.72);
    border-radius: 8px;
    padding: 8px 16px;
    position: fixed;
    top: 0;
    right: 32px;
    transition: opacity .3s, top .3s;
    opacity: 0;
    pointer-events: none;
    z-index: 200;
  }

  .ui_offline_detector span {
    color: white;
  }

  .ui_offline_detector.show {
    opacity: 1;
    top: 32px
  }
</style>