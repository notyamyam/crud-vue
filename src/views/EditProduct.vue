<template>
  <div class="edit-product-modal">
    <div class="edit-product">
      <h2>Edit Product</h2>
      <form @submit.prevent="updateProduct" class="product-form">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="editedProduct.name" required>
        <label for="description">Description:</label>
        <textarea id="description" v-model="editedProduct.description" required></textarea>
        <label for="price">Price:</label>
        <input type="number" id="price" v-model.number="editedProduct.price" required>
        <button type="submit" class="submit-button">Update Product</button>
      </form>
    </div>
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
    this.editedProduct = { ...this.$store.getters.editedProduct };
  },
  methods: {
    updateProduct() {
      this.$store.dispatch('updateProduct', this.editedProduct);
      this.$router.push('/');

    }
  }
}
</script>

<style scoped>
.edit-product-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.edit-product {
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
