<script setup>
  const props = defineProps({
    url: {  type: String, required: true },
    aspectRatio: { type: String, default: '16/9', // Ej: '4/3', '16/9', '21/9'
      validator: value => /^\d+\/\d+$/.test(value)
    },
    title: { type: String, default: 'Iframe content' },
    cover: { type: String, default: '' },
    showPlayButton: { type: Boolean, default: false }
  })

  const isPlaying = ref(false)

  const handlePlay = () => {
    isPlaying.value = true
  }

  const computedUrl = computed(() => {
    if (!isPlaying.value) return props.url
    // Si la URL ya tiene parámetros, agregamos & en lugar de ?
    const separator = props.url.includes('?') ? '&' : '?'
    return `${props.url}${separator}autoplay=1`
  })
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.container" :style="{ aspectRatio: aspectRatio }">
      <iframe
        :src="computedUrl"
        :title="title"
        :class="$style.iframe"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      
      <div v-if="cover && !isPlaying" :class="$style.cover" @click="handlePlay">
        <img :src="cover" :alt="title">
        
        <button v-if="showPlayButton" :class="$style.playButton" @click.stop="handlePlay">
          <svg viewBox="0 0 24 24" width="64" height="64">
            <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.5)"/>
            <path d="M9.5 7.5v9l7-4.5-7-4.5z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style module>
  .wrapper {
    width: 100%;
    max-width: 100%;
  }

  .container {
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .iframe {
    border: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  .cover {
    align-items: center;
    background: #000;
    cursor: pointer;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
  }

  .cover img {
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    width: 100%;
  }

  .playButton {
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    height: 64px;
    justify-content: center;
    left: 50%;
    padding: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.2s ease;
    width: 64px;
    z-index: 3;
  }

  .playButton:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }

  .playButton svg {
    pointer-events: none;
  }
</style>
