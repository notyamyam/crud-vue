<template>
    <div>
      <h2>Add Product</h2>
      <form @submit.prevent="addProduct">
        <label>Name:</label>
        <input type="text" v-model="name" required>
        <label>Description:</label>
        <textarea v-model="description" required></textarea>
        <label>Price:</label>
        <input type="number" v-model.number="price" required>
        <button type="submit">Add Product</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        description: '',
        price: 0
      };
    },
    methods: {
      addProduct() {
        const newProduct = {
          id: this.getNextProductId(),
          name: this.name,
          description: this.description,
          price: this.price
        };
        this.$store.commit('addProduct', newProduct);
        this.resetForm();
      },
      resetForm() {
        this.name = '';
        this.description = '';
        this.price = 0;
      },
      getNextProductId() {
        const products = this.$store.state.products;
        const maxId = products.length > 0 ? Math.max(...products.map(product => product.id)) : 0;
        return maxId + 1;
      }
    }
  }
  </script>
  