const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps:true
})
const Task = mongoose.model('Task',taskSchema )

module.exports = Task

// task.pre('save',async function(next){
// const task = this;

// console.log("before adding task");
// next()
// })


// const Tasks = mongoose.model('tasks',task)

