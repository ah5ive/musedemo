module.exports = (db) => {

    const getAllSongs = (request, response)=>{
        db.songlist.getAllSongs((error, queryResult)=>{

        //     let userCookies = {
        //         username: request.cookies['user_name'],
        //         userId: request.cookies['user_id'],
        //         userLogin: request.cookies['loggedin']
        // };

            console.log("controllers:",queryResult);
            //response.send('hello');
            //console.log("usercookie",userCookies);
            response.send({songlists: queryResult});
            //cookie: userCookies
            //file name home.

        });
    }

        return {
        getAllSongs,
      };
    };