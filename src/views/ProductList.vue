<template>
  <div class="product-list">
    <h2>Product List</h2>
    <ul>
      <li v-for="product in products" :key="product.id" class="product-item">
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p><strong>Description:</strong> {{ product.description }}</p>
          <p><strong>Price:</strong> {{ product.price }}</p>
        </div>
        <div class="product-actions">
          <router-link :to="{ name: 'EditProduct', params: { id: product.id }}" class="edit-link">Edit</router-link>
          <button @click="deleteProduct(product.id)" class="delete-button">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  methods: {
    deleteProduct(productId) {
      this.$store.commit('deleteProduct', productId);
    }
  }
}
</script>

<style scoped>
.product-list {
  margin-top: 20px;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.product-info {
  flex-grow: 1;
}

.product-actions {
  display: flex;
  align-items: center;
}

.edit-link {
  background-color: #356adc;
  color: white;
  border: none;
  margin-right: 5px;
  text-decoration: none;
  padding: 5px 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14.5px;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
