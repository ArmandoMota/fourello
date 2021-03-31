const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, "The Card title is required"],
  },

  dueDate: {
    type: Date,
  },

  labels: [
    {
      type: String,
    },
  ],

  description: {
    type: String,
    default: "",
  },

  listId: {
    type: String,
    required: [true, "The List ID is required"],
  },

  boardId: {
    type: String,
    required: [true, "The Board ID is required"],
  },

  position: {
    type: Number,
    default: 0,
  },
});

CardSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
