<template>
<div>
<h1>Welcome to the Test!!!</h1>

<!-- Test list -->
<template>
<div>
   <h1>Welcome to the Test!!!</h1>

   <!-- Test list -->
   <div v-for="(test, index) in tests" :key="index" class="test">
   <p><strong>Test {{ index + 1 }}:</strong> What is the English word for "{{ test.vietnamese }}"?</p>
   <input 
      type="text" 
      v-model="test.userAnswer" 
      placeholder="Enter your answer here"
      :class="{'correct': test.isCorrect, 'incorrect': !test.isCorrect && test.userAnswer !== ''}"
   />
   <button @click="checkAnswer(test, index)">Check Answer</button>
   <p v-if="test.isCorrect && test.userAnswer !== ''" class="success-message">Correct! Well done!</p>
   <p v-if="test.userAnswer !== '' && !test.isCorrect" class="error-message">Incorrect. Try again!</p>
   </div>

   <!-- Button to finish challenge -->
   <button @click="checkAllAnswers" class="ui button green">Finish Challenge</button>
   
   <!-- Result messages -->
   <p v-if="allTestsPassed" class="success-message">
   Challenge success! Số câu đúng: {{ correctAnswersCount }} / {{ tests.length }}
   </p>
   <p v-if="!allTestsPassed && checkedAll" class="error-message">
   Challenge Fail. Số câu đúng: {{ correctAnswersCount }} / {{ tests.length }}. Please try again!
   </p>
</div>
</template>

<script>
export default {
name: "TestChallenge",
data() {
   return {
   tests: [
      { vietnamese: 'Táo', english: 'Apple', userAnswer: '', isCorrect: false },
      { vietnamese: 'Bàn', english: 'Table', userAnswer: '', isCorrect: false },
      { vietnamese: 'Sách', english: 'Book', userAnswer: '', isCorrect: false },
      { vietnamese: 'Cà phê', english: 'Coffee', userAnswer: '', isCorrect: false },
      { vietnamese: 'Chó', english: 'Dog', userAnswer: '', isCorrect: false },
   ],
   allTestsPassed: false,
   checkedAll: false, 
   correctAnswersCount: 0 // Count of correct answers
   };
},
methods: {
   checkAnswer(test, index) {
   if (test.userAnswer.toLowerCase() === test.english.toLowerCase()) {
      this.$set(this.tests, index, { ...test, isCorrect: true });
   } else {
      this.$set(this.tests, index, { ...test, isCorrect: false });
   }
   },
   checkAllAnswers() {
   this.checkedAll = true; // Mark that all answers have been checked
   this.correctAnswersCount = this.tests.filter(test => test.isCorrect).length; // Count correct answers
   this.allTestsPassed = this.correctAnswersCount === this.tests.length; // Check if all answers are correct
   }
}
};
</script>

<style scoped>
.test {
margin-bottom: 20px;
}

input {
padding: 5px;
margin-left: 10px;
}

.correct {
border-color: green;
}

.incorrect {
border-color: red;
}

.success-message {
color: green;
}

.error-message {
color: red;
}

button {
margin-top: 10px;
}
</style>

