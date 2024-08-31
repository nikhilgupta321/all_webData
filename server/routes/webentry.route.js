const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/webentry.controller');

// Get all items
router.get('/webdata', entriesController.getAllEntries);
// Get a specific item by ID
router.get('/webdata/:id', entriesController.getEntriesById);
// Add a new item
router.post('/webdata', entriesController.addEntries);
// Update an item
router.put('/webdata/:id', entriesController.updateEntries);
// Delete an item
router.delete('/webdata/:id', entriesController.deleteEntries);


module.exports = router;
