//var sha256 = require('js-sha256');
module.exports = (dbPoolInstance) => {

    //create user
    const createUser = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password
      //var hashedValue = sha256(user.password);
      // set up query
      const queryString = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
      const values = [user.username, user.email, password];
      // execute query
      dbPoolInstance.query(queryString, values, (error, queryResult) => {
      // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    };

    return {
        createUser,

    }
};