const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Rental, validate } = require("../models/rental");
const { Book } = require("../models/book");
const { Customer } = require("../models/customer");

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send("Invalid book.");

  if (book.numberInStock === 0)
    return res.status(400).send("Book not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      firstname: customer.firstname,
      lastname: customer.lastname,
      phone: customer.phone,
    },
    book: {
      _id: book._id,
      title: book.title,
      dailyRentalRate: book.dailyRentalRate,
    },
  });

  rental = await rental.save();

  book.numberInStock--;
  book.save();

  // new Fawn.Task()
  //   .save("rentals", rental)
  //   .update(
  //     "books",
  //     {
  //       _id: book._id,
  //     },
  //     {
  //       $inc: { numberInStock: -1 },
  //     }
  //   )
  //   .run();

  res.send(rental);
});

module.exports = router;
