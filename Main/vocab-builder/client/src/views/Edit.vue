<template>
  <div class="edit-word-container">
    <div class="ui segment">
      <h1 class="ui header">
        <i class="edit icon"></i>
        Edit Word
      </h1>
      <form class="ui form" @submit.prevent="onSubmit">
        <!-- Input for English -->
        <div class="field">
          <label>
            <i class="united kingdom flag"></i> English
          </label>
          <div class="ui labeled input fluid">
            <input
              type="text"
              placeholder="Enter English word"
              required
              v-model="word.english"
            />
          </div>
        </div>
        <!-- Input for German -->
        <div class="field">
          <label>
            <i class="germany flag"></i> German
          </label>
          <div class="ui labeled input fluid">
            <input
              type="text"
              placeholder="Enter German translation"
              required
              v-model="word.german"
            />
          </div>
        </div>
        <!-- Input for Vietnamese -->
        <div class="field">
          <label>
            <i class="vietnam flag"></i> Vietnamese
          </label>
          <div class="ui labeled input fluid">
            <input
              type="text"
              placeholder="Enter Vietnamese translation"
              required
              v-model="word.vietnamese"
            />
          </div>
        </div>
        <!-- Submit Button -->
        <button class="ui primary button fluid">
          <i class="save icon"></i> Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ViewVocab, EditVocab } from "../helpers/api";

export default {
  name: "EditWord",
  data() {
    return {
      word: {}, // Object to store word details
    };
  },
  async mounted() {
    try {
      // Fetch word details from API
      this.word = await ViewVocab(this.$route.params.id);
    } catch (error) {
      console.error("Error fetching word details:", error);
      this.flash("Failed to load word details. Please try again.", "error");
    }
  },
  methods: {
    async onSubmit() {
      try {
        // Update word in database
        await EditVocab(this.$route.params.id, this.word);
        // Show success message
        this.flash("Word updated successfully!", "success");
        // Redirect to word list
        this.$router.push("/words");
      } catch (error) {
        console.error("Error updating word:", error);
        this.flash("Failed to save changes. Please try again.", "error");
      }
    },
  },
};
</script>

<style scoped>
.edit-word-container {
  max-width: 600px;
  margin: 20px auto;
}
.ui.segment {
  padding: 20px;
}
.ui.header {
  text-align: center;
  margin-bottom: 20px;
}
button.ui.primary.button.fluid {
  margin-top: 20px;
}
</style>
