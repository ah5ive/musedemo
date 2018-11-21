//console.log("Models User")
//var sha256 = require('js-sha256');
module.exports = (dbPoolInstance) => {
    //create user
    const createUser = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password
      //var hashedValue = sha256(user.password);
      // set up query
      const queryString = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
      const values = [user.username, user.email, user.password];
      // execute query *need to change the password to hash
      dbPoolInstance.query(queryString, values, (error, queryResult) => {
      // invoke callback function with results after query has executed
        callback(error, queryResult);
        console.log("createUser Model queryResult",queryResult)
      });
    };

    const signIn = (user, callback)=>{
        console.log("model:username", user);
        //set up query
        const queryString = "SELECT * from users WHERE username ='"+ user + "';";
        //console.log("models:queryString", queryString);
        dbPoolInstance.query(queryString,(error, queryResult) => {
            if(error){
                console.log(error, null);
            } else {
                    if (queryResult.rows[0] === undefined){
                        callback(null,null);
                    }else {
                            console.log("models: queryResultRow",queryResult.rows[0]);
                            callback(null,queryResult.rows[0]);
                        }
                }

      });

    };

    const getUser = (user, callback)=>{
            console.log("==getSonglist==",user.userid);

            const queryString = "SELECT songlists.id, users.username, songlists.songname, songlists.user_id, songlists.song_url, songlists.likecount, songlists.playcount FROM songlists INNER JOIN users ON (songlists.user_id = users.id) WHERE songlists.user_id='" + user.userid + "';";
            //
            //SELECT id, itemname, username_id, rent_id FROM items WHERE rent_id=
                dbPoolInstance.query(queryString,(error, itemResult) => {
                        // invoke callback function with results after query has executed
                    callback(error, itemResult);
                            });

    };

    return {
        createUser,
        signIn,
        getUser,

    }
};