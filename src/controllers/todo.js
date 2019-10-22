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
    todoListModel.add( todoItem );
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
  markAsDone: ( req, res, next ) => {
    const id = req.params.id;
    res.send( '<h1> Marking ' + id + ' as done </h1>' );
    next();
  },
  unmarkAsDone: ( req, res, next ) => {
    const id = req.params.id;
    res.send( '<h1> Unmarking ' + id + ' as done </h1>' );
    next();
  }
};

// TODO - read about next
// TODO - read about promise
// TODO - read about map
// TODO - read about redux