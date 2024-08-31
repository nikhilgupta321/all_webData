const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Get all items
router.route('/user').get(userController.list)

// Get a specific item by ID
router.get('/user/:id', userController.listById);

// Add a new item
router.post('/user', userController.create);

// Update an item
router.put('/user/:id', userController.update);

// Delete an item
router.delete('/user/:id', userController.remove);

module.exports = router;