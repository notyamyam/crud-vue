<template>
  <div class="p-4 space-y-9">
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
    <div v-else class="px-52 space-y-9">
      <div class="flex justify-between">
        <div>
          <h1 class="text-3xl font-semibold">Products</h1>
        </div>

        <div class="bg-blue-500 p-2 rounded-md text-white">
          <router-link to="/add" class="nav-link">Add Product</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseModal from "../components/BaseModal.vue";

export default {
  data() {
    return {
      selectedProd: {},
      editingProduct: {
        id: null,
        name: "",
        description: "",
        price: 0,
        isEditModalOpen: false, // Add isEditModalOpen property to each product
      },
      editedProductName: "",
      editedDescription: "",
      editedPrice: 0,
      isDeleteModalOpen: false,
      show: false,
    };
  },

  components: {
    BaseModal,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  methods: {
    deleteProduct() {
      console.log("Deleting product with ID:", this.selectedProd);

      this.$store.commit("deleteProduct", this.selectedProd);
      this.isDeleteModalOpen = false;
    },

    startEditing(product) {
      product.isEditModalOpen = true;
      this.editingProduct = { ...product, isEditModalOpen: true }; // Set isEditModalOpen to true for the edited product
      this.editedProductName = product.name;
      this.editedDescription = product.description;
      this.editedPrice = product.price;
    },

    saveChanges(productId) {
      const updatedProduct = {
        id: productId,
        name: this.editedProductName,
        description: this.editedDescription,
        price: this.editedPrice,
        updatedAt: Date.now(), // Update the updatedAt property
      };
      this.$store.commit("updateProduct", updatedProduct);
      this.cancelEditing();
    },

    cancelEditing() {
      // Only close the edit modal if it's currently open for the product being edited
      if (this.editingProduct.isEditModalOpen) {
        this.editingProduct.isEditModalOpen = false;
      }
    },

    openDeleteModal(product) {
      this.selectedProd = product;
      this.isDeleteModalOpen = true;
    },

    closeDeleteModal() {
      this.isDeleteModalOpen = false;
    },

    toggleElementVisibility() {
      this.show = !this.show; // Toggle the value of show
    },
  },
};
</script>

<style scoped>
.list-enter-active {
  opacity: 0;
  transform: translateY(100px);
  transition: all 0.3s ease-in-out;
}
.list-leave-active {
  opacity: 0;
  transform: translateY(-100px);
  transition: all 0.3s ease-in-out;
}
.slide-fade-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-fade-leave-active {
  transition: opacity 0.8s cubic-bezier(1, 0.5, 0.8, 1),
    transform 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
