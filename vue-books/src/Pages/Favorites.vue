<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://e6b920bb6c513ea9.mokky.dev/favorites?_relations=items'
    )
    favorites.value = data.map((obj) => obj.item)
  } catch (err) {
    console.log(err)
  }
})
</script>
<template>
  <h2 class="favorites-title">My Bookmarks</h2>
  <CardList :items="favorites" is-favorites />
</template>

<style scoped>
.favorites-title {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
}
</style>
