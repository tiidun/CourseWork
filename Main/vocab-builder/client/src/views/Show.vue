<template>
  <div class="show-word-container">
    <h1>Show Word</h1>

    <!-- English Word -->
    <div class="field">
      <label class="ui label">
        <i class="united kingdom flag"></i> English
      </label>
      <div class="ui fluid input">
        <input 
          type="text" 
          disabled 
          :value="word.english" 
        />
      </div>
    </div>

    <br />

    <!-- German Word -->
    <div class="field">
      <label class="ui label">
        <i class="germany flag"></i> German
      </label>
      <div class="ui fluid input">
        <input 
          type="text" 
          disabled 
          :value="word.german" 
        />
      </div>
    </div>

    <br />

    <!-- Vietnamese Word -->
    <div class="field">
      <label class="ui label">
        <i class="vietnam flag"></i> Vietnamese
      </label>
      <div class="ui fluid input">
        <input 
          type="text" 
          disabled 
          :value="word.vietnamese" 
        />
      </div>
    </div>

    <br />

    <!-- Edit Button -->
    <div class="actions">
      <router-link
        :to="{ name: 'Edit', params: { id: word._id } }"
        class="ui yellow button"
      >
        Edit Word
      </router-link>
    </div>
  </div>
</template>

<script>
import { ViewVocab } from "../helpers/api";

export default {
  name: "ShowWord",
  data() {
    return {
      word: {}, // Object to store the word details
    };
  },
  async mounted() {
    try {
      // Fetch the word details using the ID from route parameters
      this.word = await ViewVocab(this.$route.params.id);
    } catch (error) {
      console.error("Failed to fetch word details:", error);
      this.flash("Failed to fetch word details. Please try again.", { type: "error" });
    }
  },
};
</script>

<style scoped>
.show-word-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
.field {
  margin-bottom: 20px;
}
.ui.label {
  margin-bottom: 5px;
  display: inline-block;
  font-size: 1.1em;
}
.actions {
  margin-top: 20px;
}
</style>
