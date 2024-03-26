<script setup>
import { defineProps, inject, computed, ref } from 'vue'
import DrawerHeader from './DrawerHeader.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'
import axios from 'axios'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})
const { cart } = inject('cart')
const isCreating = ref(false)
const orderId = ref(null)
const ButtonDisabled = computed(() => {
  return isCreating.value || cartEmpty.value
})
const cartEmpty = computed(() => {
  return cart.value.length === 0
})
const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post('https://e6b920bb6c513ea9.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value
    })
    cart.value = []
    orderId.value = data.id
    return data
  } catch (e) {
    console.log(e)
  } finally {
    isCreating.value = false
  }
}
</script>
<template>
  <div class="drawer"></div>
  <div class="drawer-cart">
    <DrawerHeader></DrawerHeader>
    <div v-if="!totalPrice || orderId" class="info-block-wrapper">
      <InfoBlock
        v-if="orderId"
        title="The order has been placed"
        :description="`Your order №${orderId} will be sent for delivery`"
        :imageUrl="'/clipboard.svg'"
      ></InfoBlock>
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="The cart is empty"
        description="Add some books to the cart"
        :imageUrl="'/package.svg'"
      ></InfoBlock>
    </div>
    <div v-else>
      <CartItemList></CartItemList>
      <div class="drawer-cart__footer">
        <div class="drawer-cart__total">
          <span>Total:</span>
          <div class="drawer-cart__total-border"></div>
          <b>{{ totalPrice }} $</b>
        </div>
        <div class="drawer-cart__total">
          <span>Tax:</span>
          <div class="drawer-cart__total-border"></div>
          <b>{{ vatPrice }} $</b>
        </div>
        <button :disabled="buttonDisabled" @click="createOrder" class="drawer-cart-button">
          Place an order
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.drawer-cart {
  position: fixed;
  padding: 2rem;
  top: 0;
  right: 0;
  width: 24rem;
  height: 100%;
  background-color: white;
  z-index: 20;
}
.info-block-wrapper {
  display: flex;
  height: 100%;
  align-items: center;
}
.drawer-cart__footer {
  display: flex;
  margin-block: 1.5rem;
  flex-direction: column;
  gap: 1rem;
}
.drawer-cart__total {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.drawer-cart__total-border {
  flex: 1;
  border-bottom: 1px solid rgb(203 213 225);
  border-bottom-style: dashed;
}
.drawer-cart-button {
  cursor: pointer;
  width: 100%;
  margin-top: 1.5rem;
  padding-block: 0.75rem;
  background-color: rgb(165 180 252);
  border-radius: 0.75rem;
  border: none;
  color: white;
}
.drawer-cart-button:hover {
  background-color: rgb(129 140 248);
}
.drawer-cart-button:active {
  background-color: rgb(99 102 241);
}
.drawer-cart-button[disabled] {
  background-color: rgb(203 213 225);
}
</style>
