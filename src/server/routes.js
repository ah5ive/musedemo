//const query = require('./controllers/query')


// module.exports = (app) => {
//   app.get('/api/query', query.get);
// };

module.exports = (app, db) => {
  const songlist = require('./controllers/songlist')(db);

  app.get('/songs',songlist.getAllSongs);
};


//routes