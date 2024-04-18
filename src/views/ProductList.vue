<template>
  <div class="p-9 space-y-9">
    <h2 class="flex justify-center font-semibold text-2xl">Product List</h2>

    <div
      v-if="products.length === 0"
      class="flex flex-col justify-center items-center text-gray-400"
    >
      <div class="flex flex-col items-center space-y-2">
        <div>
          <v-icon
            name="md-removeshoppingcart-twotone"
            fill="#000"
            scale="1.5"
            @click="toggleOpen"
            class="cursor-pointer hover:bg-gray-200 hover:text-white rounded-lg"
            inverse
          />
        </div>
        <div class="flex flex-col items-center">
          <h6 class="">NO PRODUCTS</h6>
          <h6 class="font-semibold">FOUND</h6>
        </div>

        <div class="bg-blue-500 p-2 rounded-md text-white">
          <router-link to="/add" class="nav-link">Add Product</router-link>
        </div>
      </div>
    </div>
    <div v-else class="">
      <ul>
        <li v-for="product in products" :key="product.id" class="product-item">
          <div class="product-info">
            <h3 v-if="editingProduct.id !== product.id">{{ product.name }}</h3>
            <input
              type="text"
              v-model="editedProductName"
              v-if="editingProduct.id === product.id"
              required
            />
            <p v-if="editingProduct.id !== product.id">
              <strong>Description:</strong> {{ product.description }}
            </p>
            <textarea
              v-model="editedDescription"
              v-if="editingProduct.id === product.id"
              required
            ></textarea>
            <p v-if="editingProduct.id !== product.id">
              <strong>Price:</strong> {{ product.price }}
            </p>
            <input
              type="number"
              v-model.number="editedPrice"
              v-if="editingProduct.id === product.id"
              required
            />
          </div>
          <div class="product-actions">
            <button
              v-if="editingProduct.id !== product.id"
              @click="startEditing(product)"
              class="edit-button"
            >
              Edit
            </button>
            <button
              v-if="editingProduct.id === product.id"
              @click="cancelEditing"
              class="cancel-button"
            >
              Cancel
            </button>
            <button
              v-if="editingProduct.id === product.id"
              @click="saveChanges(product.id)"
              class="save-button"
            >
              Save
            </button>
            <button @click="deleteProduct(product.id)" class="delete-button">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default {
  data() {
    return {
      editingProduct: {
        id: null,
        name: "",
        description: "",
        price: 0,
      },
      editedProductName: "",
      editedDescription: "",
      editedPrice: 0,

      showSheet: false,
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  methods: {
    deleteProduct(productId) {
      this.$store.commit("deleteProduct", productId);
    },
    startEditing(product) {
      this.editingProduct = { ...product };
      this.editedProductName = product.name;
      this.editedDescription = product.description;
      this.editedPrice = product.price;
    },
    cancelEditing() {
      this.editingProduct = { id: null, name: "", description: "", price: 0 };
    },
    saveChanges(productId) {
      const updatedProduct = {
        id: productId,
        name: this.editedProductName,
        description: this.editedDescription,
        price: this.editedPrice,
      };
      this.$store.commit("updateProduct", updatedProduct);
      this.cancelEditing();
    },
  },
};
</script>

<style scoped>
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

.edit-button,
.cancel-button,
.save-button {
  background-color: #356adc;
  color: white;
  border: none;
  padding: 5px 10px;
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

textarea,
input[type="number"],
input[type="text"] {
  width: 100%;
  margin-bottom: 5px;
}
</style>
