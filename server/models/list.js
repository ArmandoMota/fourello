const Card = require('./card')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({

  title: {
    type: String,
    required: [true, 'The List title is required']
  },

  boardId: {
    type: String,
    required: [true, 'The List board ID is required']
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  updatedAt: {
    type: String,
    default: Date.now()
  },

  position: {
    type: Number,
    default: 0,
  },

  cards: [{
    type: Schema.Types.ObjectId,
    ref: "Card",
  }],


});

ListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id
  }
});

const List = mongoose.model('List', ListSchema);

module.exports = List;
module.exports = ListSchema;