<script setup>
import { ref, watch, provide, computed } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const cart = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price, 0)
})

const vatPrice = computed(() => {
  return Math.round((totalPrice.value * 2) / 100)
})

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}
const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}
const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}
watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>
<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-Price="vatPrice"></Drawer>
  <div class="wrapper">
    <Header :total-price="totalPrice" @open-drawer="openDrawer"></Header>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  display: grid;
}
.wrapper {
  background-color: rgb(100 116 139);
  width: 80%;
  margin-top: 3.5rem;
  margin: auto;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.content-wrapper {
  padding: 2.5rem;
}
.title-content {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-main {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
}
.title-select {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.select-search {
  padding-block: 0.75rem;
  padding-inline: 1.25rem;
  outline: none;
  border: 1px solid rgb(229 231 235);
  border-radius: 0.75rem;
}
.search-wrapper {
  position: relative;
}
.search {
  padding-block: 0.75rem;
  padding-left: 2.75rem;
  padding-right: 1rem;
  outline: none;
  border: 1px solid rgb(229 231 235);
  border-radius: 0.75rem;
}
.search:hover {
  border: 1px solid rgb(156 163 175);
}
.search-icon {
  position: absolute;
  top: 0.85rem;
  left: 1rem;
  width: 1.2rem;
}
</style>
