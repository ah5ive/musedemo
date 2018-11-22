//var sha256 = require('js-sha256');
const multer =  require('multer');
const cloudinary = require('cloudinary');
// var storage = multer.diskStorage({
//   filename: function(request, file, callback) {
//     callback(null, Date.now() + file.originalname);
//   }
// });

// var upLoadFilter = function (request, file, callback) {
//     // accept image files only
//     if (!file.originalname.match(/\.(mp3|wav|aiff)$/i)) {
//         return callback(new Error('Only image files are allowed!'), false);
//     }
//     callback(null, true);
// };

module.exports = (db) => {

    const createUser = (request, response) => {
        console.log("CONTROLLER CREATEUSER");
          // use user model method `create` to create new user entry in db
          db.user.createUser(request.body, (error, queryResult) => {

            //dun need cookie

            if (error) {
              console.error('error getting user:', error);
              response.sendStatus(500);
            };

            if (queryResult.rowCount >= 1) {
              console.log('User created successfully',request.body.username);

              console.log("controllers Sucess",request.body);
              //take note on coookie

              let responseObject = {
                  success: true,
                //username: request.body.username,
              };

              response.send(responseObject).status(200);
            } else {
              console.log('User could not be created');
              response.send({success: false}).status(500);
            }
          });
      };

      const signIn = (request, response)=>{

        db.user.signIn(request.body.username,(error, queryResult)=>{

            //console.log("controller: res body",request.body.password);

            //console.log("controller: signin", queryResult);

            if(error){
                console.log("error", error);
                response.status(505).send("controller Fail");
            } else if (queryResult === null) {
                response.status(404).send("controller User Not found");
                } else {
                    console.log("else controller",queryResult);
                    //var hashValue = sha256(request.body.password);
                    console.log("db sent", queryResult.password);
                    //console.log("input pass", hashValue);
                    if( queryResult.password == request.body.password){

                        let responseObject = {
                            success: true,
                            username: request.body.username,
                            user_id: queryResult.id,
                            };

                            response.send(responseObject).status(200);
                        } else {
                            response.status(403).send('Invalid password');
                            }
                }
            });
        }

        const getUser = (request,response)=>{
        console.log("REQUEST",request.body)
        db.user.getUser(request.body,(error, queryResult)=>{
        // console.log("resbdyname",request.body.name);
            if(error){
                console.log("error", error);
                response.status(505).send("Cannot get user");
            } else if (queryResult === null) {
                response.status(404).send("User Not found");
                } else {
                    console.log("user songlist",queryResult.rows);
                    //console.log("itemResult",itemResult.rows )
                    response.send(queryResult.rows);
                };
            //});
            })
        }

        const userUpload = (request, response)=>{
            cloudinary.v2.uploader.upload(`public/uploads/${request.file.filename}`,
                { resource_type: "video" },
                function(error, result){
                    db.user.userUpload(result.secure_url, request.body.name,(error, queryResult)=>{
                        if(error){
                            console.log("error", error);
                            response.sendStatus(500);
                        } else if (queryResult === null){
                            response.status(400);
                        } else {
                            response.send("success");
                        }
                    });
                    console.log("cloud", result.secure_url);
                    console.log("controller request", request.body.name)
                });


        }

    return {
        createUser,
        signIn,
        getUser,
        userUpload,
    };
};