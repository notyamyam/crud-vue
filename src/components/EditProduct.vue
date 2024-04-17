<template>
    <div>
      <h2>Edit Product</h2>
      <form @submit.prevent="updateProduct">
        <label>Name:</label>
        <input type="text" v-model="editedProduct.name" required>
        <label>Description:</label>
        <textarea v-model="editedProduct.description" required></textarea>
        <label>Price:</label>
        <input type="number" v-model.number="editedProduct.price" required>
        <button type="submit">Update Product</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        editedProduct: {
          id: null,
          name: '',
          description: '',
          price: 0
        }
      };
    },
    mounted() {
      this.editedProduct = this.$store.state.editedProduct;
    },
    methods: {
      updateProduct() {
        this.$store.commit('updateProduct', this.editedProduct);
      }
    }
  }
  </script>
  