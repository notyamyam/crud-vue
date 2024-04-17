import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/views/ProductList.vue';
import AddProduct from '@/views/AddProduct.vue';
import EditProduct from '@/views/EditProduct.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/add', component: AddProduct },
  { path: '/edit/:id', name: 'EditProduct', component: EditProduct, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
