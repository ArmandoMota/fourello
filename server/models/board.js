const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Board title is required']
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List' 
    }
  ],
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
});

BoardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;