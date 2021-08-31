const mongoose = require('mongoose')

const {Schema} = mongoose

const ProjectSchema = new Schema({

    title:{
        type: String,
    },
    description: {
        type: String,
       
    },
    projectID:{
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
    tasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
   
    members:[{
         type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
   
    status:{
        type: String,
    }, 
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]

})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project