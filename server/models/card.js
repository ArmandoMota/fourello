const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The Card title is required"],
    },
    dueDate: Date,

    labels: [
      {
        type: String,
      },
    ],

    description: String,

    listId: {
      type: String,
      required: [true, "The card's List Id is required"],
    },
    boardId: {
      type: String,
    },

    archived: {
      type: Boolean,
      default: false,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    position: {
      type: mongoose.Types.Decimal128,
      default: 0.0,
    },

    comments: {
      type: Array,
      default: [],
    },

    actions: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

CardSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject["_id"];
    delete returnedObject["_id"];
  },
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
