//console.log("Model songlists")

module.exports = (dbPoolInstance) => {

    const getAllSongs = (callback)=>{
        //console.log("model:items", item);
        //set up query
        const queryString = 'SELECT * FROM songlists;';

        console.log("models: songlist QueryString", queryString);

        dbPoolInstance.query(queryString,(error, queryResult) => {
            //console.log("models", queryResult.rows);

             callback(error, queryResult.rows);

      });


    };

return {
    getAllSongs,

  };
};