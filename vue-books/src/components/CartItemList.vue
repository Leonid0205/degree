<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, addToCart, removeFromCart } = inject('cart')
</script>
<template>
  <div class="cart-item-list" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeFromCart(item)"
    ></CartItem>
  </div>
</template>

<style scoped>
.cart-item-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
}
</style>
