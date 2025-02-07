const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Author, validate } = require("../models/author");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const authors = await Author.find().sort("firstname");
  res.send(authors);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let author = new Author({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    nationality: req.body.nationality,
    birth_date: req.body.birth_date,
  });
  author = await author.save();

  res.send(author);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      nationality: req.body.nationality,
      birth_date: req.body.birth_date,
    },
    { new: true }
  );

  if (!author)
    return res.status(404).send("The author with the given ID was not found.");

  res.send(author);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  res.send(author);
});

module.exports = router;
