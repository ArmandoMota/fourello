const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The List title is required']
  },
  boardId: {
    type: String,
    required: [true, 'The list\'s Board Id is required']
  },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
  // position needs to be added
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card' 
    }
  ],
});

const List = mongoose.model('List', ListSchema);

module.exports = List;