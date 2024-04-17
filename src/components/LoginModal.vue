<template>
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <h2>Login</h2>
        <form @submit.prevent="login">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
          <button type="submit" class="login-submit">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Check if email and password match the predefined user
        if (this.email === 'example@gmail.com' && this.password === '123456') {
          this.$store.dispatch('login').then(() => {
            // Close the modal after successful login
            this.$emit('close');
            // Clear email and password fields
            this.email = '';
            this.password = '';
          });
        } else {
          // Display an error message for invalid credentials
          alert('Invalid email or password.');
        }
      },
      close() {
        // Emit event to close the modal
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  
  .login-submit {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .login-submit:hover {
    background-color: #0056b3;
  }
  
  </style>
  