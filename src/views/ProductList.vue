<template>
  <div class="p-9 space-y-9">
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
    <div v-else class="px-96 space-y-9">
      <div class="flex justify-between">
        <div>
          <h1 class="text-3xl font-semibold">Products</h1>
        </div>
        <div class="bg-blue-500 p-2 rounded-md text-white">
          <router-link to="/add" class="nav-link">Add Product</router-link>
        </div>
      </div>
      <ul>
        <transition-group name="fade">
          <li
          v-for="product in products"
          :key="product.id"
          class="flex justify-between items-start p-3 border-b border-gray-300"
          >
            <div>
              <div class="flex text-2xl font-medium">
                <h2 class="me-2">{{ product.name }}</h2>
                <h2 class="text-gray-400">₱ {{ product.price }}</h2>
              </div>

              <div>
                <h6 class="text-gray-800">{{ product.description }}</h6>
              </div>
            </div>
            <div class="flex justify-center">
              <form
                @submit.prevent="saveChanges(product.id)"
                class="product-form"
              >
                <BaseModal :visible="isEditModalOpen">
                  <transition-group name="fade-edit-modal">
                    <div class="space-y-7 p-5">
                      <div class="flex flex-col space-y-1">
                        <h1 class="text-2xl font-semibold">Edit Product</h1>
                        <h1 class="text-gray-400">
                          Make changes to this product. Click 'Save' when you're
                          done.
                        </h1>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-"
                          >Name</label
                        >
                        <input
                          type="text"
                          id="name"
                          v-model="editingProduct.name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring focus:ring-blue-500 block w-full p-2.5"
                          placeholder="Surf Poweder e.g"
                          required
                        />
                      </div>

                      <div>
                        <label
                          for="description"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-"
                          >Description</label
                        >
                        <textarea
                          id="description"
                          v-model="editingProduct.description"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring focus:ring-blue-500 block w-full p-2.5"
                          required
                          placeholder=" - Surf powder provides you with an excellent cleaning with fresh fragrances, giving your laundry a lift with every wash. e.g"
                        ></textarea>
                      </div>

                      <div>
                        <label
                          for="price"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-"
                          >Price (₱)</label
                        >
                        <input
                          type="number"
                          id="price"
                          v-model.number="editingProduct.price"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring focus:ring-blue-500 block w-full p-2.5"
                          required
                        />
                      </div>

                      <div class="flex justify-end space-x-3">
                        <button
                          @click="saveChanges(product.id)"
                          class="bg-white0 hover: font-normal py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          class="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </transition-group>
                </BaseModal>
              </form>

              <BaseModal :visible="isDeleteModalOpen">
                <transition-group name="fade-delete-modal">
                  <div class="flex flex-col justify-center space-y-8 p-5">
                    <div class="flex flex-col">
                      <h6 class="text-2xl font-semibold">Delete</h6>
                      <h6 class="text-gray-400">
                        Click 'Yes' if you want to delete the product.
                      </h6>
                    </div>
                    <div class="flex flex-col">
                      <div>
                        <h6 class="text-lg font-medium">
                          Are you sure you want to delete this product?
                        </h6>
                      </div>

                      <div class="flex justify-end space-x-5 mt-4">
                        <button @click="closeDeleteModal">No</button>
                        <button
                          class="bg-red-500 hover:bg-red-600 text-white font-normal py-2 px-4 rounded"
                          @click="deleteProduct(product.id)"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </transition-group>
              </BaseModal>

              <div class="space-x-1 flex">
                <button @click="startEditing(product)" class="edit-button">
                  <v-icon
                    name="md-modeeditoutline-outlined"
                    scale="2"
                    class="text-gray-500 hover:bg-gray-200 rounded-md p-2"
                  ></v-icon>
                </button>

                <button class="delete-button" @click="openDeleteModal">
                  <v-icon
                    name="md-deleteoutline-outlined"
                    scale="2"
                    class="text-gray-500 hover:bg-gray-200 rounded-md p-2"
                  ></v-icon>
                </button>
              </div>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseModal from "../components/BaseModal.vue";

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
      isEditModalOpen: false,
      isDeleteModalOpen: false,
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
    deleteProduct(productId) {
      this.$store.commit("deleteProduct", productId);
      this.isDeleteModalOpen = false;
    },
    startEditing(product) {
      this.editingProduct.id = product.id;
      this.editingProduct.name = product.name;
      this.editingProduct.description = product.description;
      this.editingProduct.price = product.price;
      this.isEditModalOpen = true;
    },

    saveChanges(productId) {
      const updatedProduct = {
        id: productId,
        name: this.editingProduct.name,
        description: this.editingProduct.description,
        price: this.editingProduct.price,
      };
      this.$store.commit("updateProduct", updatedProduct);
      this.isEditModalOpen = false; // Close the edit modal after saving changes
    },

    openDeleteModal() {
      this.isDeleteModalOpen = true;
    },

    closeDeleteModal() {
      this.isDeleteModalOpen = false;
    },

    closeEditModal() {
      this.isEditModalOpen = false;
    },
  },
};
</script>

<style scoped>
/* animation for adding of products */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* animation for editing products */
.fade-edit-modal-enter-active,
.fade-edit-modal-leave-active {
  transition: opacity 0.3s;
}

.fade-edit-modal-enter, .fade-edit-modal-leave-to /* .fade-edit-modal-leave-active in <2.1.8 */ {
  opacity: 0;
}

/* animation for deleting products */
.fade-delete-modal-enter-active,
.fade-delete-modal-leave-active {
  transition: opacity 0.3s;
}

.fade-delete-modal-enter, .fade-delete-modal-leave-to /* .fade-delete-modal-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>