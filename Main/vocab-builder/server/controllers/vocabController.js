// Import the vocabModel to interact with the database
const vocabModel = require('../models/vocabModel')

// Function to view all vocabularies
const viewAllVocabs = async (req, res) => {
   try {
      // Retrieve all vocabularies from the database
      // Sort by "_id" in descending order (newest entries at the top)
      let vocabs = await vocabModel.find({}).sort({ _id: -1 })

      // Send the retrieved data as a JSON response
      res.json(vocabs)
   } catch (err) {
      // Handle any errors by sending the error message
      res.send(err)
   }
}

// Function to add a new vocabulary
const addVocab = async (req, res) => {
   try {
      // Get the input data from the request body
      let vocab = req.body

      // Save the new vocabulary to the database
      await vocabModel.create(vocab)

      // Return a success message as a JSON response
      res.json({ "message": "Add vocab succeed!" })
   } catch (err) {
      // Handle any errors by sending the error message
      res.send(err)
   }
}

// Function to delete all vocabularies
const deleteAllVocabs = async (req, res) => {
   try {
      // Delete all vocabulary records from the database
      await vocabModel.deleteMany()

      // Return a success message as a JSON response
      res.json({ "message": "Delete all vocabs succeed!" })
   } catch (err) {
      // Handle any errors by sending the error message
      res.send(err)
   }
}

// Function to view a specific vocabulary by ID
const viewVocab = async (req, res) => {
   try {
      // Get the ID from the request parameters
      let id = req.params.id

      // Find the vocabulary by its ID
      let vocab = await vocabModel.findById(id)

      // Send the vocabulary data as a JSON response
      res.json(vocab)
   } catch (err) {
      // Handle any errors by sending the error message
      res.send(err)
   }
}

// Function to edit an existing vocabulary by ID
const editVocab = async (req, res) => {
   try {
      // Get the ID from the request parameters
      let id = req.params.id

      // Get the updated data from the request body
      let data = req.body

      // Update the vocabulary in the database
      await vocabModel.findByIdAndUpdate(id, data)

      // Return a success message as a JSON response
      res.json({ "message": "Edit vocab succeed!" })
   } catch (err) {
      // Handle any errors by sending the error message
      res.send(err)
   }
}

// Function to delete a specific vocabulary by ID
const deleteVocab = async (req, res) => {
   try {
      // Get the ID from the request parameters
      let id = req.params.id

      // Delete the vocabulary by its ID
      await vocabModel.findByIdAndDelete(id)

      // Return a success message as a JSON response
      res.json({ "message": "Delete vocab succeed!" })
   } catch (err) {
      // Handle any errors by sending the error message
      res.send(err)
   }
}

// Export the functions so they can be used in other files
module.exports = {
   viewAllVocabs,
   addVocab,
   deleteAllVocabs,
   viewVocab,
   editVocab,
   deleteVocab
}
