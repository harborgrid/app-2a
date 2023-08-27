<template>
    <div class="decision-visualization">
      <h2>Decision Visualization</h2>
      <div v-for="decision in decisions" :key="decision.id">
        <h3>{{ decision.input }}</h3>
        <p>Decision: {{ decision.decision }}</p>
        <p>Optimization: {{ decision.optimization }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DecisionVisualization',
    props: {
      decisions: Array
    }
  }
  </script>
  
  <style scoped>
  .decision-visualization {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
  }
  </style>
  