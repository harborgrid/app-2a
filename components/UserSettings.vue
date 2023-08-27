<template>
    <div class="user-settings">
      <h2>User Settings</h2>
      <div>
        <label for="theme">Theme:</label>
        <select v-model="selectedTheme" @change="updateTheme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div>
        <label for="notifications">Enable Notifications:</label>
        <input type="checkbox" v-model="notificationsEnabled" @change="toggleNotifications">
      </div>
      <button @click="saveSettings">Save Settings</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserSettings',
    data() {
      return {
        selectedTheme: 'light',
        notificationsEnabled: true
      };
    },
    methods: {
      updateTheme() {
        // Logic to update the theme
      },
      toggleNotifications() {
        // Logic to enable/disable notifications
      },
      saveSettings() {
        // Logic to save user settings
      }
    }
  }
  </script>
  
  <style scoped>
  .user-settings {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
  }
  </style>
  