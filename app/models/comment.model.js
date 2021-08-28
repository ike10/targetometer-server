const mongoose = require('mongoose')

const {Schema} = mongoose

const CommentSchema = new Schema({

    title:{
        type: String,
    },
    description: {
        type: String,
       
    },
   
    task:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    user:{
         type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    

})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment