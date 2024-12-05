const Favorite = require('../models/favorite');

exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { exchangeRateId } = req.body;

    // Crear el favorito con userId e exchangeRateId
    const favorite = new Favorite({ userId, exchangeRateId });
    await favorite.save();

    res.status(201).json({ message: 'Favorito añadido correctamente', favorite });
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir favorito', error });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user._id });
    res.send(favorites);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
