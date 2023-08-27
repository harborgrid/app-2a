<template>
    <div class="dashboard">
      <h1>Decision Dashboard</h1>
      <div v-for="decision in decisions" :key="decision.id">
        <h2>{{ decision.title }}</h2>
        <p>{{ decision.explanation }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        decisions: [] // This will hold the decisions fetched from the backend
      };
    },
    created() {
      // Fetch decisions from the backend and populate the decisions array
      // This logic can be expanded upon based on specific needs
    }
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
  }
  </style>
  