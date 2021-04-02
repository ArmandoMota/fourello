const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "The Comment text is required"],
    },
    cardId: {
      type: String,
      required: [true, "The cardId is required"],
    },
  },
  { timestamps: true }
);

CommentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
