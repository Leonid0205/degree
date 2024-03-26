<script setup>
import { inject } from 'vue'

const { closeDrawer } = inject('cart')
</script>
<template>
  <div class="drawer-cart__header">
    <svg
      @click="closeDrawer"
      class="cart__arrow"
      width="28px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M5 12H19M5 12L11 6M5 12L11 18"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
    <h2 class="cart__title">Cart</h2>
  </div>
</template>
<style scoped>
.drawer-cart__header {
  margin-block: 1rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}
.cart__title {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}
.cart__arrow {
  cursor: pointer;
  opacity: 0.3;
}
.cart__arrow:hover {
  opacity: 1;
  transform: translateX(-0.25rem);
  transition: ease-in 0.2s;
}
</style>
