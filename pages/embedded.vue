<template>
  <div class="embedded-container">
    <iframe
      :src="targetUrl"
      frameborder="0"
      class="w-full h-full"
      allow="fullscreen"
    ></iframe>
  </div>
</template>

<script setup>
const targetUrl = 'https://jolly-island-0b20ee200.6.azurestaticapps.net/relationship'; // 請替換成您想要嵌入的網址
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.embedded-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.embedded-container iframe {
  border: none;
  width: 100%;
  height: 100%;
}
</style>
