const Joi = require("joi");
const { required, func } = require("joi");
const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
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
  nationality: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  birth_date: {
    type: Date,
    required: true,
  },
});

const Author = mongoose.model("Author", authorSchema);

function validateAuthor(author) {
  const schema = Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    nationality: Joi.string().min(5).required(),
    birth_date: Joi.date().required(),
  });

  return schema.validate(author);
}

exports.authorSchema = authorSchema;
exports.Author = Author;
exports.validate = validateAuthor;
