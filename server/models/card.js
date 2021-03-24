const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  description: String,
  // labels: [
  //   { type: String }
  // ],
  listId: {
    type: String,
    required: [true, 'The card\'s List Id is required']
  },
  // "position": 65535.0,
  // "archived": false,
  // "createdAt": "2020-10-08T17:54:55.285Z",
  // "updatedAt": "2020-10-08T17:54:55.285Z",
  // "dueDate": null,
  // "completed": false,
  // "boardId": 1,
  // "comments": [],
  // "actions": []
});

CardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject["_id"];
    delete returnedObject["_id"];
  },
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;