<template>
    <div class="user-profile">
      <h1>Your Profile</h1>
      <label>Username: <input v-model="username" /></label>
      <label>Email: <input v-model="email" /></label>
      <button @click="updateProfile">Update Profile</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: ''
      };
    },
    created() {
      // Fetch user profile details from the backend and populate the data
      // This logic can be expanded upon based on specific needs
    },
    methods: {
      updateProfile() {
        // Logic to update user profile details in the backend
        // This can be expanded upon based on specific needs
      }
    }
  };
  </script>
  
  <style scoped>
  .user-profile {
    padding: 20px;
  }
  </style>
  