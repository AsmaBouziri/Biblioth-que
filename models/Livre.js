const mongoose = require("mongoose");

const BookSchemma = mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true, min: 10, max: 50 },
  auteur: { type: JSON, required: true },
  edition: { type: JSON, required: true },
  genre: { type: Array, required: true },
  NbPages: { type: Number, required: true },
});

module.exports = mongoose.model("Livre", BookSchemma);
