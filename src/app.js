/* jshint esversion: 9 */

const bodyParser = require( "body-parser" ),
  express = require( 'express' ),
  app     = express(),
  todo    = require( './controllers/todo' );

let port = process.env.TODO_API_PORT;

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
todo.set( app );

if( port == null ) {
  port = 3000;
}

app.listen( port, () => {
  console.log( "Magic happens on port ", port );
});