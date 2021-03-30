const List = require("./list");
const mongoose = require("mongoose");
const { schema } = require("./card");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
    required: [true, "The Board title is required"],
  },

  createdAt: {
    type: String,
    default: Date.now(),
  },

  updatedAt: {
    type: String,
    default: Date.now(),
  },

  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
  ],
});

BoardSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
