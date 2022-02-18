//CRUD operation
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId 
//difine the connection url
const {MongoClient,ObjectId} = require('mongodb')
const id = new ObjectId()//call with no args
// console.log(id.toString());//to get the string only
// console.log(id.id);//to get the id buffer  = 12
// console.log(id.getTimestamp());
// console.log(id.toHexString().length);// 24
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    //connecting to db is ASYNC op
    if (error) {
      return console.log("unable to connect to db");
    }

    const db = client.db(databaseName);

                        // db.collection('users').insertOne({ //insertOne is Async
                        //     _id:id.toString(),
                        //     name:'sssssssssss',
                        //     age:31
                        // },(error,result)=>{
                        //     // this is a cb function that will get back with 2 things
                        //     //error if any or / result
                        //         if(error){
                        //             return console.log('unable to insert user ' + error);
                        //         }
                        //         console.log(result.insertedId);
                        // })
                        // const doc1 = {name:'Jen',age:30}
                        // const doc2 = {name:'Lara',age:21}
                        // db.collection('users').insertMany([doc1,doc2],(err,res)=>{
                        //     if(err){
                        //         return console.log('Faild to insert docs!');
                        //     }
                        //     console.log(res.insertedCount);
                        // })
                        // const doc1 = { name: "Jen", age: 30 };
                        // const doc2 = { name: "Lara", age: 21 };
                        // db.collection("users").insertMany([doc1, doc2], (err, res) => {
                        //   if (err) {
                        //     return console.log(err);
                        //   }
                        //   console.log(res);
                        // });
                        // db.collection("tasks").insertMany(
                        //   [
                        //     { description: "clean house", complete: true },
                        //     { description: "renew house", complete: false },
                        //     { description: "buy pots", complete: true },
                        
                        //   ],
                        //   (err, result) => {
                        //     if (err) {
                        //       return console.log(err);
                        //     }
                        //     console.log(result);
                        //   }
                        // );

                        // #############findOne########
                          //find accept 2 args
                          // obj to find user by
                          //function always return the first one in case of similar doc
                          //we cannot search by _id alone unless we save it as string "61ff4cc0a18b327be5620dca"
                          // it should be like this:{_id:new ObjectId("61fe6c58316012e0b49f08d5")}

                        // db.collection('users').findOne({_id:"61ff4cc0a18b327be5620dca"},(error,user)=>{
                        //   if(error){
                        //     console.log('unable to fetch');
                        //   }
                        //   console.log(user);
                        // })
                      // #######################
                      //find accept obj only
                      // dones not accept a Callback
                      //return a cursor ==> a pointer to the data in the db
                      // db.collection('users').find({age:31}).count((err,users)=>{
                      //   console.log(users);
                      // })
                      // ############ last doc by id##########
                      // db.collection('tasks').find({complete:false}).toArray((err,tasks)=>{
                      //   console.log(tasks);
                      // })

                      // ############# Updata the doc ##########
                      // #### update One #####
                      // db.collection('users').updateOne({
                      //   _id:new ObjectId("61fe6c58316012e0b49f08d5")
                      // },{
                      //   //update we want to apply
                      //   $set:{
                      //     name:'Larus'
                      //   }
                      // }).then((result)=>{
                      //   console.log(result);
                      // }).catch((err)=>{
                      //   console.log(err);
                      // })
                    //############## DELETE ###############
                    db.collection('users').deleteMany({
                      age:31
                    }).then(res=>{  
                      console.log(res);
                    }).catch(err=>{
                      console.log(err);
                    })




  }
);
