const mongoose = require("mongoose");

const BookSchemma = mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true, min: 10, max: 50 },
  auteur: { type: JSON, required: true }, // {Nom,Nationalite,Biographie}
  edition: { type: JSON, required: false }, // {ISBN,NomEdition,Langue}
  genre: { type: Array, required: true }, //[drama, romance ...]
  NbPages: { type: Number, required: true },
});

module.exports = mongoose.model("Livre", BookSchemma);
