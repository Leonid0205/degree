<script setup>
import { defineEmits } from 'vue'

defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>
<template>
  <header class="header">
    <router-link to="/">
      <div class="header__left">
        <img src="/book.svg" alt="book" class="book" />
        <div>
          <h2 class="header__title">Vue Books</h2>
          <p class="header__subtitle">Best books shop</p>
        </div>
      </div>
    </router-link>

    <ul class="header__right">
      <li @click="emit('openDrawer')" class="header__right-item">
        <img src="/cart.svg" alt="cart" class="icons-header" />
        <b>{{ totalPrice }} $</b>
      </li>

      <router-link to="/favorites">
        <li class="header__right-item">
          <img src="/heart.svg" alt="heart" class="icons-header" />
          <span>Bookmarks</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
.header {
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(226 232 240);
  border-radius: 0 0 0.75rem 0.75rem;
  padding: 2rem 2.5rem;
}
.header__left {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.header__title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.header__subtitle {
  color: rgb(203 213 225);
}
.header__right {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}
.header__right-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgb(107 114 128);
  cursor: pointer;
}
.header__right-item:hover {
  color: #000000;
}
.icons-header {
  width: 1.5rem;
}
.book {
  width: 2.5rem;
}
</style>
