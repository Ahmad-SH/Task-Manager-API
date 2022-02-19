const request = require('supertest')
const { set } = require('../src/app')
const app = require('../src/app')
const Task = require('../src/models/tasks')
const {setupDB,userOneId,userOne,userTwo,userTwoId,taskOne,taskTwo,taskThree} = require('./fixtures/db')

beforeEach(setupDB)

test('should create task for user', async() => {
    const response = await request(app).post('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        description:"From my test"
    })
    .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false) 

})


test('should request all tasks for a user', async () => {
    const res = await request(app).get('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(res.body.length).toEqual(2)
})

test('should  not delete another users task', async() => {
    const res = await request(app).delete(`/tasks/${taskOne._id}`) 
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})
