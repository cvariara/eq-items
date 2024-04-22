const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  lucylink: String,
  information: Object // Define more specific schema for 'information' if needed
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
