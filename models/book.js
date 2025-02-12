const Joi = require("joi");
const { required, func } = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");
const { authorSchema } = require("./author");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  language: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  pages: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 9999,
  },
  published_date: {
    type: Date,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  authors: [
    {
      type: new mongoose.Schema({
        firstname: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 50,
        },
        lastname: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 50,
        },
      }),
    },
  ],
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    language: Joi.string().min(5).required(),
    pages: Joi.number().integer().min(5).max(9999).required(),
    published_date: Joi.date().required(),
    genreId: Joi.objectId().required(),
    authors: Joi.array().required(),
    numberInStock: Joi.number().integer().min(0).max(255).required(),
  });

  return schema.validate(book);
}

exports.bookSchema = bookSchema;
exports.Book = Book;
exports.validate = validateBook;
