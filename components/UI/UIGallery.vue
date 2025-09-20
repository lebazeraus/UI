<script setup>
  const props = defineProps({
    images: { type: Array, required: true },
    autoplay: { type: Boolean, default: true },
    interval: { type: Number, default: 6e3 },
    enableSwipe: { type: Boolean, default: true }
  })

  const currentIndex = ref(0)
  const touchStart = ref({ x: 0, y: 0 })
  const isDragging = ref(false)
  let autoplayInterval

  const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length
  }

  const prevImage = () => {
    currentIndex.value = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
  }

  const startAutoplay = () => {
    if (props.autoplay) {
      autoplayInterval = setInterval(nextImage, props.interval)
    }
  }

  const stopAutoplay = () => {
    clearInterval(autoplayInterval)
  }

  const handleStart = (e) => {
    const point = e.touches ? e.touches[0] : e
    touchStart.value = { 
      x: point.clientX, 
      y: point.clientY 
    }
    isDragging.value = false
  }

  const handleMove = (e) => {
    if (!props.enableSwipe || !touchStart.value) return
    
    const point = e.touches ? e.touches[0] : e
    const deltaX = point.clientX - touchStart.value.x

    if (Math.abs(deltaX) > 50) {
      isDragging.value = true
      if (deltaX > 0) {
        prevImage()
      } else {
        nextImage()
      }
      touchStart.value = null
    }
  }

  const handleEnd = () => {
    touchStart.value = null
    isDragging.value = false
  }

  onMounted(() => {
    startAutoplay()
  })

  onBeforeUnmount(() => {
    stopAutoplay()
  })
</script>

<template>
  <div :class="$style.gallery">
    <div :class="$style.container"
         @mousedown="handleStart"
         @mousemove="handleMove"
         @mouseup="handleEnd"
         @mouseleave="handleEnd"
         @touchstart.prevent="handleStart"
         @touchmove.prevent="handleMove"
         @touchend="handleEnd">
      <img draggable="false"
        v-for="(image, index) in images"
        :key="index"
        :src="image.src"
        :alt="image.title"
        :class="[$style.image, { 
          [$style.current]: index === currentIndex,
          [$style.prev]: index === (currentIndex - 1 + images.length) % images.length,
          [$style.next]: index === (currentIndex + 1) % images.length
        }]"
      >
    </div>
  </div>
</template>

<style module>
  .gallery {
    align-items: center;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .container {
    height: 100%;
    position: relative;
    touch-action: pan-y pinch-zoom;
    user-select: none;
    width: 100%;
  }

  .image {
    border-radius: 8px;
    height: 100%;
    left: 50%;
    object-fit: cover;
    opacity: 0;
    position: absolute;
    transform: translateX(-50%) scale(0.8);
    transition: all 0.5s ease;
    user-select: none;
    width: 80%;
  }

  .current {
    opacity: 1;
    transform: translateX(-50%) scale(1);
    z-index: 2;
  }

  .prev {
    opacity: 0.7;
    transform: translateX(-67%) scale(0.9);
    z-index: 1;
  }

  .next {
    opacity: 0.7;
    transform: translateX(-33%) scale(0.9);
    z-index: 1;
  }
</style>
