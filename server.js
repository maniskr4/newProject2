const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

app.use(express.json());

// Set up MongoDB connection using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your MongoDB schema and model here
const FoodItemSchema = new mongoose.Schema({
  name: String,
  image: String,
  category: String,
  label: String,
  price: Number,
  description: String,
});

const FoodItem = mongoose.model('FoodItem', FoodItemSchema);

// API endpoint to fetch data from the database
app.get('/api/foodItems', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to update prices in the database
app.put('/api/foodItems/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    await FoodItem.findByIdAndUpdate(id, { price });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});