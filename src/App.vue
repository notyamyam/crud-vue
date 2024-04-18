<template>
  <div id="app" class="app-container">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Product List</router-link>
      <router-link to="/add" class="nav-link">Add Product</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
}

.app-container {
  padding: 20px;
}

.navbar {
  background-color: #6cb2eb;
  padding: 10px;
  margin-bottom: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin-right: 20px;
  padding: 5px 10px;
  border-radius: 5px;
}

.nav-link:hover {
  background-color: #3a9ad9;
}
</style>
