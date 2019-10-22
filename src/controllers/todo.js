/* jshint esversion: 9 */

const todoListModel = require( "../models/todo" );

module.exports = {
  set: function( app ) {
    app.get( '/', this.home );
    app.post( '/add', this.add );
    app.get( '/remove/:id', this.remove );
    app.get( '/list', this.list );
    app.get( '/done/:id', this.markAsDone );
    app.get( '/undone/:id', this.unmarkAsDone );
  },
  home: ( req, res, next ) => {
    res.send( '<h1>That`s fine</h1>' );
    next();
  },
  add: ( req, res, next ) => {
    let todoItem = {
      id: req.body.id,
      name: req.body.name,
      done: req.body.done
    };
    todoListModel.upsert( todoItem );
    res.send( todoItem );
    next();
  },
  remove: ( req, res, next ) => {
    const id = req.params.id;
    todoListModel.remove( id );
    res.send( '<h1> Item ' + id + ' was removed </h1>' );
    next();
  },
  list: async ( req, res, next ) => {
    let todos = await todoListModel.list();
    console.log( todos );
    res.send( todos );
    next();
  },
  doneAndUndone: async ( res, done ) => {
    let todoItem = await todoListModel.findById( req.params.id );
    todoItem.done = done;
    todoItem.__v += 1;
    todoListModel.upsert( todoItem );
    res.send( todoItem );
  },
  markAsDone: async function( req, res, next ) {
    this.doneAndUndone( res, true );
    next();
  },
  unmarkAsDone: async function( req, res, next ) {
    this.doneAndUndone( res, false );
    next();
  }
};

// TODO - read about next
// TODO - read about promise
// TODO - read about map
// TODO - read about redux