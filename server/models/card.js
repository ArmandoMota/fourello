const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({

  title: {
    type: String,
    required: [true, 'The Card title is required']
  },

  dueDate: {
    type: String,
    default: null,
  },

  labels: [
    {
      type: String
    }
  ],

  description: {
    type: String,
    default: ""
  },

  listId: {
    type: Number,
    required: [true, 'The List ID is required'],
  },

  boardId: {
    type: Number,
    required: [true, 'The Board ID is required'],
  },

  position: {
    type: Number,
    default: 0
  },

});

CardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id
  }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
module.exports = CardSchema;