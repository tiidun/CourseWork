const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Data = require('./models/model');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// API Endpoints
app.get('/api/data', async (req, res) => {
const data = await Data.find();
res.json(data);
});

app.post('/api/data', async (req, res) => {
    try {
        // Kiểm tra nếu req.body là một mảng
        if (Array.isArray(req.body)) {
            const newData = await Data.insertMany(req.body); // Thêm nhiều dữ liệu
            res.status(201).json({
                message: 'Data added successfully',
                data: newData
            });
        } else {
            // Nếu không phải mảng, thêm một dữ liệu duy nhất
            const newData = new Data(req.body);
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


// Start Server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

