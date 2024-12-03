//declare "express" framework
const express = require('express');
const vocabModel = require('./models/vocabModel');

//declare server instance (app)
const app = express();

//declare server port
const port = 3000      ;    //default
//set content for homepage (test only)
// app.get('/', (req, res) => {
//    res.send("COMP1842 - MEVN stack web app")
// })

//declare "mongoose" library: to connect to MongoDB
const mongoose = require('mongoose')
//declare database connection string (URI) + database name
const database = "mongodb://localhost:27017/vocab-builder"     //vocab-builder: database name
//connect to database
mongoose.connect(database)
.then(() => console.log('connect to db succeed !'))
.catch((err) => console.error('connect to db failed !' + err))

//declare "body-parser" library/package/module: to take input's value
const bodyParser = require('body-parser')
//config "body-parser"
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//declare "cors" library: to share API with "client" (front-end)
const cors = require('cors')
//enable cors : VERY IMPORTANT
app.use(cors())

//declare router (route)
const vocabRouter = require ('./routes/vocabRouter')
//register router: VERY IMPORTANT
vocabRouter(app)

app.get('/data', (req, res) => {
res.send("<h1>This is homepage of backend side</h1>")
})

//run server: listen to port
app.listen(port, () => {
console.log('Backend server is running at http://localhost:' + port)
})

app.post('/data', async (req, res) => {
try {
      // Kiểm tra nếu req.body là một mảng
      if (Array.isArray(req.body)) {
         
         const newData = await vocabModel.insertMany(req.body); // Thêm nhiều dữ liệu
         console.log('test')
         res.status(201).json({
            message: 'Data added successfully',
            data: newData  
         });
      } else {
         console.log('test2')
         // Nếu không phải mảng, thêm một dữ liệu duy nhất
         const newData = new vocabModel(req.body);
         await newData.save();
         res.status(201).json({
            message: 'Single data added successfully',
            data: newData
         });
      }
} catch (err) {
      res.status(500).json({
         message: 'Error occurred while adding data',
         error: err.message
      });
}
});
