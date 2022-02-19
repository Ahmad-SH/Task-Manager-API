const request = require("supertest");
// access express app before listen is called
const app = require("../src/app");
const User = require('../src/models/users')
const {setupDB,userOne,userOneId} = require('./fixtures/db')
//this will run before each test case
beforeEach(setupDB)

test('should signup a new user',async () => {
    const res  = await request(app).post('/users').send({
        name:'Ahmad',
        email:'eng.ahmadsh28@gmail.com',
        password:'MyPass777!'
    }).expect(201)
    // console.log(res.body);
    const user  = await User.findById(res.body.user._id)
    expect(user).not.toBeNull()

    //Assertion about the res
    // expect(res.body.user.name).toBe('Ahmad')
    //assert entire object
    expect(res.body).toMatchObject({
        user:{
            name:'Ahmad',
            email:'eng.ahmadsh28@gmail.com'
        }
    })
    expect(user.password).not.toBe('MyPass777!')
})

test('should login existing user ', async() => {
   const res =  await request(app).post('/users/login')
    .send({
          email:userOne.email,
          password:userOne.password
      }).expect(200)
      const user = await User.findById(userOneId)
      expect(res.body.token).toBe(user.tokens[1].token)
})

test('should not login notexisting user', async() => {
    await request(app).post('/users/login').send({
        email:'eng.ahmadsh28@gmail.com',
        password:'MyPass777!'
    }).expect(400)
})


test('should get profile for user', async() => {
    await request(app).get('/users/me')   
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`) //set headers,// test if user get the token
    .send()
    .expect(200)
})

test('should not get profile for unauthenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})
test('should delete account for user', async() => {
    const res = await request(app)
    .delete('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})
test('should not delete unauth user',async ()=>{
        await request(app).delete('/users/me')
        .send()
        .expect(401)// 401 == unautherized
})

//send File
test('should upload avatar image',async () => {
    await request(app).post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)
    //compare binary data
    const user = await User.findById(userOneId)
    // expect({}).toBe({})// will fail bcs, toBe uses triple(=), {}==={}(not equal)
    // expect({}).toEqual({}) // passes! O.K
    expect(user.avatar).toEqual(expect.any(Buffer)) // to check if it is a buffer// we can check for String... 
})
test('should update valid uset field',async () => {
    await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name:'John',
    }).expect(200)
    //confirm name has changes
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('John')
})
test('should not update invalid user FIELDs', async() => {
    await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        location:'Boston'
    }).expect(400)//bad request, bcs,we are authorized but cannot edit unexisted field!

})




// afterEach(()=>{
//     console.log('after each');
// })
// beforeAll(()=>{}) and afterAll(()=>{})