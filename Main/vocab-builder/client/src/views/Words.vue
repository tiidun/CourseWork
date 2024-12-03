<template>
<div class="word-list-container">
  <!-- Search Bar -->
  <div class="search-container">
    <input 
      type="text" 
      class="ui input search-box" 
      placeholder="Search words..." 
      v-model="searchQuery" 
      @input="onSearch"
    />
  </div>

  <!-- Sort Options -->
  <div class="field">
    <label class="ui label">Sort By:</label>
    <select v-model="sortCriteria" @change="sortWords">
      <option value="english">English</option>
      <option value="german">German</option>
      <option value="vietnamese">Vietnamese</option>
    </select>
  </div>

  <!-- Word Table -->
  <table class="ui celled table">
    <thead>
      <tr>
        <th colspan="6" class="header-title">WORD LIST</th>
      </tr>
      <tr>
        <th>English</th>
        <th>German</th>
        <th>Vietnamese</th>
        <th>Actions</th>
        <th colspan="2">
          <button 
            class="ui button blue delete-all-button" 
            @click.prevent="onDeleteAll"
          >
            Delete All
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="filteredWords.length === 0">
        <td colspan="6" class="no-data">No words found for your search.</td>
      </tr>
      <tr v-else v-for="(word, i) in filteredWords" :key="i">
        <td>{{ word.english }}</td>
        <td>{{ word.german }}</td>
        <td>{{ word.vietnamese }}</td>
        <td>
          <router-link
            class="ui button green"
            :to="{ name: 'Show', params: { id: word._id } }"
          >
            Show
          </router-link>
        </td>
        <td>
          <router-link
            class="ui button yellow"
            :to="{ name: 'Edit', params: { id: word._id } }"
          >
            Edit
          </router-link>
        </td>
        <td>
          <button 
            class="ui button red" 
            @click.prevent="onDelete(word._id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  
  <!-- Loading or Message Section -->
  <div v-if="isLoading" class="loading-message">
    <p>Loading data...</p>
  </div>
  <div v-if="error" class="error-message">
    <p>{{ errorMessage }}</p>
  </div>
</div>
</template>

<script>
import { ViewAllVocabs, DeleteVocab, DeleteAllVocabs } from "../helpers/api";

export default {
name: "WordList",
data() {
  return {
    words: [],
    searchQuery: "",
    filteredWords: [],
    isLoading: false, // New data property to show loading
    error: false, // Error flag
    errorMessage: "", // Error message
    sortCriteria: "english", // Default sorting criteria
  };
},
async mounted() {
  this.isLoading = true; // Start loading
  try {
    const data = await ViewAllVocabs();
    this.words = data;
    this.filteredWords = data;
  } catch (error) {
    console.error("Failed to fetch words:", error);
    this.error = true;
    this.errorMessage = "Failed to load words. Please try again.";
  } finally {
    this.isLoading = false; // End loading
  }
},
methods: {
  async onDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this word?");
    if (confirmDelete) {
      try {
        await DeleteVocab(id);
        this.words = this.words.filter((word) => word._id !== id);
        this.filteredWords = this.filteredWords.filter((word) => word._id !== id);
        this.flash("Word deleted successfully!", { type: "success" });
      } catch (error) {
        console.error("Failed to delete word:", error);
        this.flash("Failed to delete the word. Please try again.", { type: "error" });
      }
    }
  },
  async onDeleteAll() {
    const confirmDeleteAll = window.confirm("Are you sure you want to delete all words?");
    if (confirmDeleteAll) {
      try {
        await DeleteAllVocabs();
        this.words = [];
        this.filteredWords = [];
        this.flash("All words deleted successfully!", { type: "success" });
      } catch (error) {
        console.error("Failed to delete all words:", error);
        this.flash("Failed to delete all words. Please try again.", { type: "error" });
      }
    }
  },
  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredWords = this.words.filter(
      (word) =>
        word.english.toLowerCase().includes(query) || 
        word.german.toLowerCase().includes(query) || 
        word.vietnamese?.toLowerCase().includes(query)
    );
  },
  sortWords() {
    // Sort the filteredWords based on the selected sortCriteria
    if (this.sortCriteria === 'english') {
      this.filteredWords = this.filteredWords.sort((a, b) => a.english.localeCompare(b.english));
    } else if (this.sortCriteria === 'german') {
      this.filteredWords = this.filteredWords.sort((a, b) => a.german.localeCompare(b.german));
    } else if (this.sortCriteria === 'vietnamese') {
      this.filteredWords = this.filteredWords.sort((a, b) => a.vietnamese.localeCompare(b.vietnamese));
    }
  },
},
};
</script>

<style scoped>
.word-list-container {
max-width: 900px;
margin: auto;
padding: 20px;
}
.header-title {
text-align: center;
font-size: 1.5em;
background-color: #f0f8ff;
padding: 10px;
}
.no-data {
text-align: center;
font-style: italic;
color: #888;
}
.delete-all-button {
float: right;
margin-top: 10px;
}
.search-container {
margin-bottom: 20px;
text-align: center;
}
.search-box {
width: 100%;
max-width: 400px;
padding: 10px;
font-size: 1em;
}
.loading-message, .error-message {
text-align: center;
font-size: 1.2em;
color: #f44336;
}
.error-message {
font-weight: bold;
}
</style>
