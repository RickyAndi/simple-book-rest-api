const server = require('./server');
const mongoose = require('./Mongoose');
const config = require('../config.json');
const environtment = process.env.NODE_ENV;
const port = config.port[environtment];
let runningServer, dbConnection;

const dbUserName = config.db.username;
const dbPassword = config.db.password;
const dbName = config.db.name[environtment];
const dbHost = config.db.host;
const dbPort = config.db.port;
const mongodConnectionUri = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

module.exports = {
  start(callback) {
    dbConnection = mongoose.connect(mongodConnectionUri, { 
      useMongoClient: true, 
      username: dbUserName, 
      password: dbPassword 
    })
      .then(() => {
        runningServer = server
          .listen(port, () => {
            console.log('App listen on port ' + port);
            if(typeof callback === 'function') {
              callback();
            }
          })
      })
      .catch((error) => {
        console.error(error);
        if(typeof callback === 'function') {
          callback();
        }
      });
  },
  stop(callback) {
    runningServer.close();
    mongoose.connection.close();
    if(typeof callback === 'function') {
      callback();
    }
  }
}
