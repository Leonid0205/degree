<script setup>
import { defineProps, defineEmits } from 'vue'
import Card from './Card.vue'

defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>
<template>
  <div class="cards-grid" v-auto-animate>
    <Card
      v-for="item in items"
      :id="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :key="item.id"
      :isAdded="item.isAdded"
      :on-click-favorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :on-click-add="isFavorites ? null : () => emit('addToCart', item)"
      :isFavorite="item.isFavorite"
    ></Card>
  </div>
</template>
<style scoped>
.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
}
</style>