const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The List title is required"],
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    position: {
      type: mongoose.Types.Decimal128,
      default: 0.0,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  { timestamps: true }
);

ListSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject["_id"];
    delete returnedObject["_id"];
  },
});

const List = mongoose.model("List", ListSchema);

module.exports = List;
