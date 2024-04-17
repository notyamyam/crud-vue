<template>
  <div class="add-product-modal">
    <div class="add-product">
      <h2>Add Product</h2>
      <form @submit.prevent="addProduct" class="product-form">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required></textarea>
        <label for="price">Price:</label>
        <input type="number" id="price" v-model.number="price" required>
        <button type="submit" class="submit-button">Add Product</button>
      </form>
    </div>
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
        price: parseFloat(this.price)
      };
      this.$store.dispatch('addProduct', newProduct);
      this.resetForm();
      this.$router.push('/');

    },
    resetForm() {
      this.name = '';
      this.description = '';
      this.price = 0;
    },
    getNextProductId() {
      const products = this.$store.getters.products;
      const maxId = products.length > 0 ? Math.max(...products.map(product => product.id)) : 0;
      return maxId + 1;
    }
  }
}
</script>

<style scoped>
.add-product-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.add-product {
  margin-top: 20px;
}

.product-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
