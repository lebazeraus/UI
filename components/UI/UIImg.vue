<script setup>
  const props = defineProps({
    src: { type: String },
    srcPlaceholder: { type: String, default: '/iso.png' }
  })
  const srcDefault = ref()

  function change() {
    srcDefault.value = props.srcPlaceholder
  }

  function styleHeightWidth($attrs) {
    return {
      height: $attrs?.height ? ($attrs.height + 'px') : 'initial',
      width: $attrs?.width ? ($attrs.width + 'px') : 'initial'
    }
  }
</script>

<template>
  <ClientOnly>
    <img v-if="!src || srcDefault" :src="srcDefault" v-bind="$attrs" :class="$style.ui_img" :style="styleHeightWidth($attrs)">
    <img v-else @error="change" :src :class="$style.ui_img" :style="styleHeightWidth($attrs)">
    <template #fallback>
      <div v-bind="$attrs" :class="$style.ui_img" :style="styleHeightWidth($attrs)">
        <UISpinner style="height: 100%; margin: auto;" size="20"/>
      </div>
    </template>
  </ClientOnly>
</template>

<style module>
  .ui_img {
    background-color: var(--color-background-focus);
    object-fit: cover;
    object-position: center;
  }
</style>