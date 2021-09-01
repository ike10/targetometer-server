const mongoose = require('mongoose')

const {Schema} = mongoose

const TaskSchema = new Schema({

    title:{
        type: String,
    },
    description: {
        type: String,
        
    },
    taskID:{
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    startdate:{
        type: String,
    },
    enddate:{
        type:String,
    },
   
    members:[{
         type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    status:{
        type: String
    }, 
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]

})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task