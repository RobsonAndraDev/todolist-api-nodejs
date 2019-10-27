/* jshint esversion: 9 */

const conn = require("./conn"),
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const todoListSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  },
  datetime: {
    type: Date,
    required: true
  }
}, {
  collection: "todolist"
});
const TodoList = mongoose.model( "todolist", todoListSchema );

module.exports = {
  upsert: async ( item ) => {
    await conn.open();
    let tl = new TodoList( item );
    await tl.save();
    conn.close();
  },
  remove: async ( id ) => {
    await conn.open();
    TodoList.deleteOne({ _id: id }, err => {
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
    let tls = await TodoList.find();
    conn.close();
    return tls;
  },
  findById: async ( id ) => {
    await conn.open();
    let tl = await TodoList.findById( id, err => {
      if( !err ) {
        console.log( "Item", id, "find" );
      } else {
        console.log( "Something wrong on findById" );
      }
      conn.close();
    });
    return tl;
  },
  findWhenAdded: async ( name, now ) => {
    await conn.open();
    
    let tl = await TodoList.find({ name: name, datetime: now }, err => {
      if( !err ) {
        console.log( "Item", name, "find" );
      } else {
        console.log( "Something wrong on findWhenAdded" );
      }
      conn.close();
    });
    return tl;
  }
};
