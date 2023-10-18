const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require("./models/Livre");

app.use(express.json());

//connexion BD
mongoose
  .connect("mongodb://127.0.0.1:27017/Bibliotheque", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connexion a MongoDB reussie!"))
  .catch((e) => console.log("connexion a MongoDB échouée!", e));

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Heders",
    "Origin,X-Requsted-With,Content,Accept,Content-Type,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  next();
});

//APIs

/*ajouter livre*/
app.post("/api/Books", (req, res) => {
  const book = new Book(req.body);
  book
    .save()
    .then(() => {
      res.status(201).json({
        model: book,
        message: "Livre ajouté!",
      });
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
});

/*Afficher tous les livres du biblio*/
app.get("/api/Books/All", (req, res) => {
  Book.find()
    .then((books) =>
      res.status(200).json({
        Livres: books,
        message: "success!",
      })
    )

    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "probleme d'extraction des livres ! ",
      });
    });
});

/*Afficher un livre selon id*/
app.get("/api/Books/id/:id", (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        res.status(404).json({
          message: "livre non trouvé!",
        });
      } else {
        res.status(200).json({
          model: book,
          message: "livre trouvé!",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
});
app.get("/api/Books/auteur/:nom", (req, res) => {
  Book.find({ "auteur.Nom": req.params.nom })
    .then((livres) => {
      if (!livres) {
        return res.status(404).json({
          message: "Aucun livre trouvé pour cet auteur.",
        });
      } else {
        res.status(200).json({
          Livres: livres,
          message: "Livres trouvés",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
        message: "Problème d'extraction des livres!",
      });
    });
});

/*Modifier un livre avec son id en paramétre */
app.patch("/api/Books/update/:id", (req, res) => {
  Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((book) => {
      if (!book) {
        res.status(404).json({
          message: "livre non trouvé!",
        });
      } else {
        res.status(200).json({
          model: book,
          message: "livre modifié!",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
});

/*suprimmer un livre */
app.delete("/api/Books/delete/:id", (req, res) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() =>
      res.status(200).json({
        message: "success!",
      })
    )
    .catch(() => {
      res.status(400).json({
        error: Error.message,
      });
    });
});

module.exports = app;
