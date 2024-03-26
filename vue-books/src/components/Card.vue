<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})
</script>
<template>
  <div class="card">
    <img
      v-if="onClickFavorite"
      @click="onClickFavorite"
      :src="!isFavorite ? '/like2.svg' : '/like1.svg'"
      alt="like2"
      class="like-one"
    />
    <img :src="imageUrl" alt="book" class="book-image" />
    <p class="book__discription">
      {{ title }}
    </p>
    <div class="book__content">
      <div class="book__content-price">
        <span class="price">Price</span>
        <b class="cost">{{ price }} $</b>
      </div>
      <img
        v-if="onClickAdd"
        @click="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/plusChecked.svg'"
        alt="plus"
        class="icons-book"
      />
    </div>
  </div>
</template>
<style scoped>
.cards {
  padding: 1.5rem;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgb(241 245 249);
  border-radius: 0.5rem;
  padding: 2.5rem;
  cursor: pointer;
  background-color: white;
}
.card:hover {
  transform: translateY(-0.5rem);
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  transition: ease-in 0.2s;
}
.book-image {
  width: 18rem;
  height: 18rem;
}
.book__discription {
  margin-top: 0.5rem;
}
.book__content {
  display: flex;
  justify-content: space-between;
  margin-top: 1.25rem;
}
.book__content-price {
  display: flex;
  flex-direction: column;
}
.price {
  color: rgb(203 213 225);
}
.like-one {
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;
  width: 1.5rem;
}
.icons-book {
  width: 1.5rem;
}
</style>
