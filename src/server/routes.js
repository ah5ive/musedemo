
// const query = require('./controllers/query')


// module.exports = (app) => {
//   app.get('/api/query', query.get);
// };

module.exports = (app, db) => {
  const songlist = require('./controllers/songlist')(db);
  const user = require('./controllers/user')(db, songlist);
  //app.get('/api/query', query.get);
  //app.get('/user/new',user.createUserForm);
  app.post('/api/profile/user/:id', user.getUser)
  app.get('/api/songs',songlist.getAllSongs);
  app.post('/api/register', user.createUser);
  app.post('/api/signin', user.signIn);
};


//routes