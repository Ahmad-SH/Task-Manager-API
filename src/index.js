const app = require('./app')


app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});



























// const express = require("express");
// const Tasks = require("./models/tasks");
// require("./db/mongoose"); //to ensure file runs and mongoose connected to database
// const userRouter = require("./routers/user");
// const taskRouter = require("./routers/tasks");
// const User = require("./models/users"); //load user in
// const jwt = require("jsonwebtoken");
//file upload
//we will use form data, not json as before
// const multer = require('multer')

// const app = express();
// const port = process.env.PORT;

// const upload = multer({
//   dest:'images',
//   limits:{
//     fileSize: 1000000   // number in Bytes
//   },
//   fileFilter(req,file,cb){
//     //get the file name
//       if(!file.originalname.match(/\.(doc|docx)$/)){
//         return cb(new Error ('please upload a word document'))
//       }
//       cb(undefined,true)
//     // cb(new Error('file must be PDF'))
//     // cb(undefined,true) // nothing went wrong, true= upload is expected
//     // cb(undefined,false) // no error, upload is rejected
//   }
// })
// // const errorMiddleware=(req,res,next)=>{
// //   throw new Error('From my middleware')
// // }
// //upload.single() is middleware from multer
// app.post('/upload',upload.single('upload'),(req,res)=>{
//   res.send()
// },(error,req,res,next)=>{
// //4 args are a must for error handeling
// res.status(400).send({error:error.message})// from my middleware
// })


// when receiving data from outside
// we need to configure express to parse data for us
// app.use(express.json());
// app.use(userRouter);
// app.use(taskRouter);

//with middleware: new request --> so smth --> run route handler




// const myFunction = async () => {
//     // const password = "Red12345!";
//     // //hased alog are not reversable
//     // //encrypted one is reversable
//     // const hashedPass = await bcrypt.hash(password, 8);
//     // // console.log(hashedPass);

//     // const isMatch = await bcrypt.compare("Red12345!", hashedPass);
//     // // console.log(isMatch);
//   //   const authToken = jwt.sign({_id:'123abc'},'thisismynewprogram',{
//   //     expiresIn:'7 days'
//   //   })
//   //   // console.log(authToken);
//   //   const data = jwt.verify(authToken,'thisismynewprogram')
//   // console.log(data);


// };
// myFunction();
////########Explain toJSON
// const pet = {
//   name:"Hal"
// }

// pet.toJSON = function (){
//   console.log(this);
//   return this
// }
// console.log(JSON.stringify(pet));


// const main = async()=>{
// // //     const task = await Task.findById('62079ee26ad207a907cd1504')
// // //     await task.populate('owner')
// // //     console.log(task.owner);
// // const user = await User.findById('62079ee26ad207a907cd1504')
// // await user.populate('tasks')
// // console.log(user.tasks);
// const user = await User.findById('6208779ead8d7297148344b3')
// await user.populate('tasks')
// console.log(user.tasks);

// }

// main()








// app.use((req,res,next)=>{
//       res.status(503).send('Site is currently down!');
      
// })

