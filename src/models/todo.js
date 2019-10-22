/* jshint esversion: 9 */

const conn = require("./conn"),
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const todoListSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  },
}, {
  collection: "todolist"
});
const TodoList = mongoose.model( "todolist", todoListSchema );

module.exports = {
  add: async ( item ) => {
    await conn.open();
    let todoList = new TodoList( item );
    await todoList.save();
    conn.close();
  },
  remove: async ( id ) => {
    await conn.open();
    TodoList.deleteOne({ id: id }, err => {
      if( !err ) {
        console.log( "Item", id, "was removed" );
      } else {
        console.log( "Something wrong on remove item", id );
      }
      conn.close();
    });
  },
  list: async () => {
    await conn.open();
    let todos = await TodoList.find();
    conn.close();
    return todos;
  }
};
