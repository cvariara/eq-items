const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');

// Route to fetch all items
router.get('/', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || '';
    const limit = 10;

    const items = await Item.find({
      name: { $regex: searchTerm, $options: 'i'}
    }).limit(limit);
    
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch a subset of items (30 random items)
router.get('/subset', async (req, res) => {
  try {
    const items = await Item.aggregate([ { $sample: { size: 30 } } ]);
    res.json(items);
  } catch (error) {
    console.error('Error fetching subset of items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch a single item by its id (item.id)
router.get('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findOne({ id: itemId });
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error fetching item by id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
