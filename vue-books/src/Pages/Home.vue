<script setup>
import { inject, reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import CardList from '../components/CardList.vue'

const { addToCart, removeFromCart, cart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuerry: ''
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        favorite_id: item.id,
        item
      }
      item.isFavorite = true
      const { data } = await axios.post('https://e6b920bb6c513ea9.mokky.dev/favorites', obj)
      item.favoriteId = data.id
      console.log(data)
    } else {
      item.isFavorite = false
      await axios.delete(`https://e6b920bb6c513ea9.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://e6b920bb6c513ea9.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.favorite_id === item.id)
      if (!favorite) {
        return item
      }
      return { ...item, isFavorite: true, favoriteId: favorite.id }
    })
  } catch (e) {
    console.log(e)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.searchQuerry) {
      params.title = `*${filters.searchQuerry}*`
    }
    const { data } = await axios.get('https://e6b920bb6c513ea9.mokky.dev/books', { params })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)
</script>
<template>
  <div class="title-content">
    <h2 class="title-main">All books</h2>
    <div class="title-select">
      <select @change="onChangeSelect" class="select-search">
        <option value="title">By Name</option>
        <option value="price">By price (descent)</option>
        <option value="-price">By price (ascent)</option>
      </select>
      <div class="search-wrapper">
        <img class="search-icon" src="/search.svg" alt="search" />
        <input @change="onChangeSearchInput" type="text" class="search" placeholder="Search" />
      </div>
    </div>
  </div>
  <CardList
    :items="items"
    @add-to-favorite="addToFavorite"
    @add-to-cart="onClickAddPlus"
  ></CardList>
</template>

<style scoped></style>