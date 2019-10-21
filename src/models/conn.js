/* jshint esversion: 9 */

const mongoose = require( "mongoose" );
let conn;
let host   = process.env.DB_HOST,
    dbName = process.env.DB_NAME,
    passwd = process.env.DB_PASSWD,
    dbPort = process.env.DB_PORT,
    user   = process.env.DB_USER;

class Conn {
  async open() {
    if( mongoose.connection.readyState == 0 ) {
      setDefaults();
      let connectionStr = mountConnectionStr();
      conn = mongoose.connect( connectionStr,
        { 
          useNewUrlParser: true,
          useUnifiedTopology: true 
        },
        ( err, db ) => {
          if ( err ) {
            console.log( "Error on connect", err );
          } else {
            console.log( "Connected" );
          }
        }
      );
    }
    return conn;
  }

  async close() {
    conn = mongoose.connection.close();
    console.log( "Connection closed" );
    return conn;
  }
}

function setDefaults() {
  if( !host ) {
    host = "172.17.0.1";
  }

  if( !dbName ) {
    dbName = "todolist";
  }

  if( !passwd ) {
    passwd = "example";
  }

  if( !user ) {
    user = "root";
  }

  if( !dbPort ) {
    dbPort = "27017";
  }
}

function mountConnectionStr() {
  return "mongodb://" + user + ":" + passwd + "@" + host + ":" + dbPort + "/" + dbName + "?" + "authSource=admin";
}

module.exports = new Conn();
