// const query = require('./controllers/query')
// module.exports = (app) => {
//   app.get('/api/query', query.get);
// };
//declare upload and cloudinary at module export
module.exports = (app, db, upload, cloudinary) => {
  const songlist = require('./controllers/songlist')(db);
  const user = require('./controllers/user')(db, songlist, upload, cloudinary);
  //app.get('/api/query', query.get);
  //app.get('/user/new',user.createUserForm);
  app.post('/api/profile/user/upload', upload.single('audio'), user.userUpload);
  app.post('/api/profile/user/:id', user.getUser)
  app.get('/api/songs',songlist.getAllSongs);
  app.post('/api/register', user.createUser);
  app.post('/api/signin', user.signIn);
};


//routes