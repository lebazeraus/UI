<template>
  <NuxtLink :class="$style.Link"><slot/></NuxtLink>
</template>

<style module>
  .Link {
    color: var(--link-color-text);
    cursor: pointer;
    text-decoration: none;
  }
  
  .Link * {
    color: inherit;
  }

  .Link:hover {
    text-decoration: underline;
  }

  .Link:hover * {
    text-decoration: inherit;
  }
</style>