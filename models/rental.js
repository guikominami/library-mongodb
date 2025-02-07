const Joi = require("joi");
const mongoose = require("mongoose");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        firstname: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        lastname: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
      required: true,
    },
    book: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
  })
);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    bookId: Joi.objectId().required(),
  });

  return schema.validate(rental);
}



exports.Rental = Rental;
exports.validate = validateRental;
