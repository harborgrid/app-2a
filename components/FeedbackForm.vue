<template>
    <div class="feedback-form">
      <h1>Provide Your Feedback</h1>
      <textarea v-model="feedback" placeholder="Enter your feedback here..."></textarea>
      <button @click="submitFeedback">Submit</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        feedback: ''
      };
    },
    methods: {
      submitFeedback() {
        // Logic to send feedback to the backend
        // This can be expanded upon based on specific needs
      }
    }
  };
  </script>
  
  <style scoped>
  .feedback-form {
    padding: 20px;
  }
  </style>
  