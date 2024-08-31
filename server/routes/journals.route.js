const express = require('express');
const router = express.Router();
const journalsController = require('../controllers/journals.controller');

// Get all items
router.route('/journals').get(journalsController.getAllJournals)

// Get a specific item by ID
router.get('/journals/:id', journalsController.getJournalsById);

// Add a new item
router.post('/journals', journalsController.addJournals);

// Update an item
router.put('/journals/:id', journalsController.updateJournals);

// Delete an item
router.delete('/journals/:id', journalsController.deleteJournals);

module.exports = router;
