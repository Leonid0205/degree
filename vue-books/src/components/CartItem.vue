<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
})
</script>
<template>
  <div class="cart-item">
    <img :src="imageUrl" alt="book" class="cart-item-image" />
    <div class="cart__content">
      <p>{{ title }}</p>
      <div class="cart__content-price">
        <b class="price">{{ price }} $</b>
        <img @click="emit('onClickRemove')" class="cart-item-icon" src="/close.svg" alt="close" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid rgb(241 245 249);
  padding: 1rem;
  border-radius: 0.75rem;
}
.cart-item-image {
  width: 8rem;
}
.cart__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
}
.cart__content-price {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
  flex: 1;
}
.cart-item-icon {
  width: 1.5rem;
  opacity: 0.4;
}
.cart-item-icon:hover {
  opacity: 1;
  cursor: pointer;
  transition: ease-in 0.2s;
}
</style>
