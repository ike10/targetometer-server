const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSchema = new Schema({

    firstname:{
        type: String,
   },
   lastname:{
    type: String,
},
    email: {
        type: String,
        trim: true,
    },
  userID:{
      type:String,
  },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    username:{
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },

    projects:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    
    profileimage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    isVerified:{
        type: Boolean,
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]


})

const User = mongoose.model('user', UserSchema)

module.exports = User