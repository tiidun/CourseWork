<template>
  <div class="new-word-form">
    <h1>Add New Word</h1>
    <form action="" @submit.prevent="onSubmit">
      <!-- English Input -->
      <div class="field">
        <label for="english" class="ui label">
          <i class="united kingdom flag"></i> English
        </label>
        <div class="ui fluid input">
          <input 
            id="english" 
            type="text" 
            placeholder="Enter the English word" 
            required 
            v-model.trim="word.english" 
          />
        </div>
      </div>

      <br />

      <!-- German Input -->
      <div class="field">
        <label for="german" class="ui label">
          <i class="germany flag"></i> German
        </label>
        <div class="ui fluid input">
          <input 
            id="german" 
            type="text" 
            placeholder="Enter the German word" 
            required 
            v-model.trim="word.german" 
          />
        </div>
      </div>

      <br />

      <!-- Vietnamese Input -->
      <div class="field">
        <label for="vietnamese" class="ui label">
          <i class="vietnam flag"></i> Vietnamese
        </label>
        <div class="ui fluid input">
          <input 
            id="vietnamese" 
            type="text" 
            placeholder="Enter the Vietnamese word" 
            required 
            v-model.trim="word.vietnamese" 
          />
        </div>
      </div>

      <br />

      <!-- Submit Button -->
      <div class="ui field">
        <button class="ui primary button" type="submit">
          Add Word
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { AddVocab } from "../helpers/api";
export default {
  name: "NewWord",
  data() {
    return {
      word: {
        english: "",
        german: "",
        vietnamese: "", // Field for Vietnamese
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        // Add new word to database
        await AddVocab(this.word);

        // Display success message
        this.flash("New word added successfully!", { type: "success" });

        // Redirect to word list
        this.$router.push("/words");
      } catch (error) {
        console.error(error);
        this.flash("Failed to add the word. Please try again.", { type: "error" });
      }
    },
  },
};
</script>

<style scoped>
.new-word-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.field {
  margin-bottom: 20px;
}
.ui.label {
  margin-bottom: 10px;
  display: block;
}
</style>
