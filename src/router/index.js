import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/views/ProductList.vue';
import AddProduct from '@/views/AddProduct.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/add', component: AddProduct },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
