<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>
<template>
  <div class="info-wrapper">
    <img class="info-image" :src="imageUrl" alt="info image" />
    <h2 class="info-title">{{ title }}</h2>
    <p class="info-description">{{ description }}</p>
  </div>
</template>

<style scoped>
.info-wrapper {
  margin-inline: auto;
  width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info-image {
  width: 8rem;
  height: 8rem;
}
.info-title {
  margin-top: 1rem;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 500;
}
.info-description {
  margin-top: 1rem;
  color: rgb(209 213 219);
}
</style>
