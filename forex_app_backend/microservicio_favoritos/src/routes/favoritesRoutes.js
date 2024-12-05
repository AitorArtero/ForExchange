const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesControllers');
const auth = require('../middleware/auth');

router.post('/favorites', auth, favoritesController.addFavorite);
router.get('/favorites', auth, favoritesController.getFavorites);
router.delete('/favorites/:id', auth, favoritesController.deleteFavorite);

module.exports = router;
