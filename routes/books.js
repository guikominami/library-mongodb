const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Book, validate } = require("../models/book");
const { Genre } = require("../models/genre");
const { Author } = require("../models/author");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.find().sort("title");
  res.send(books);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const authors = await Author.find({ _id: { $in: req.body.authors } });
  if (authors.length === 0) return res.status(400).send("Invalid authors.");

  let book = new Book({
    title: req.body.title,
    language: req.body.language,
    pages: req.body.pages,
    published_date: req.body.published_date,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    authors: authors,
    numberInStock: req.body.numberInStock,
    date: Date.now(),
  });

  book = await book.save();
  res.send(book);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      language: req.body.language,
      pages: req.body.pages,
      published_date: req.body.published_date,
    },
    { new: true }
  );

  if (!book)
    return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  res.send(book);
});

module.exports = router;
