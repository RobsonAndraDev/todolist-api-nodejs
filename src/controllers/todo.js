const todoListModel = require( "../models/todo" );

const doneAndUndone = async ( res, done, id ) => {
  const todoItem = await todoListModel.findById( id );
  if( todoItem ) {
    todoItem.done = done;
    todoItem.__v += 1;
    todoListModel.upsert( todoItem );
  }
  res.send( todoItem );
};

class Todo {
  set( app ) {
    app.get( '/', this.home );
    app.post( '/add', this.add );
    app.get( '/remove/:id', this.remove );
    app.get( '/list', this.list );
    app.get( '/done/:id', this.markAsDone );
    app.get( '/undone/:id', this.unmarkAsDone );
    app.get( '/find/:name/:now', this.findOne );
  }

  home( req, res, next ) {
    res.send( '<h1>This is a Rest API</h1>' );
    next();
  }

  async add( req, res, next ) {
    let todoItem = {
      name: req.body.name,
      done: req.body.done,
      datetime: req.body.now
    };
    await todoListModel.upsert( todoItem );
    res.send( todoItem );
    next();
  }

  async remove( req, res, next ) {
    const id = req.params.id;
    const tl = await todoListModel.remove( id );
    res.send( tl );
    next();
  }

  async list ( req, res, next ) {
    let todos = await todoListModel.list();
    console.log( todos );
    res.send( todos );
    next();
  }

  async markAsDone ( req, res, next ) {
    await doneAndUndone( res, true, req.params.id );
    next();
  }

  async unmarkAsDone( req, res, next ) {
    await doneAndUndone( res, false, req.params.id );
    next();
  }

  async findOne( req, res, next ) {
    const name = req.params.name;
    const now = req.params.now;
    const todoItem = await todoListModel.findWhenAdded( name, now );
    console.log( "New:", todoItem );
    res.send( todoItem );
    next();
  }
}

module.exports = Todo;

// TODO - read about next
// TODO - read about promise
// TODO - read about reduce
// TODO - Find a way to don't use public methods for everything