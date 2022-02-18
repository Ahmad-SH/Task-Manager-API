const mongoose = require('mongoose');
// const validator = require('validator');
mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
                
         
})
// const User = mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     age:{
//         type:Number,
//         validate(value){
//             if(value < 0 ){
//                 throw new Error('Age must be positive number')
//             }
//         },
//         default:0
//     },
//     email:{
//         type:String,
//         required:true,
//         validate(value){ // validate is a function from mongoose 
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         },
//         trim:true,
//         lowercase:true
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         // minlength:7 instead of value.length
//         validate(value){
//             if(value.length <= 6){
//                 throw new Error('password must be more than 6 characters')
//             }
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('password String is not accepted , please choose another one!')
//             }
//         }
//     }
// })

// instance of the model 
// const me = new User({
//     name:'  Ahmad  ',
//     email:'teSt@Test.com',
//     password:'anotherPass123'
// })
// //save to db
// me.save().then((res)=>{
//     console.log(res);
// }).catch(err =>{
//     console.log(err);
// })
// __v:0 the version of the document
// #######################÷
// const Tasks = mongoose.model('tasks',{
//     description:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default:false,

//     }
// })

// const myTasks =  new Tasks({
//     description:'House Cleaning',
//     completed:false
// })
// myTasks.save().then(res =>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

