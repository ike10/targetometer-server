const User = require('../models/user.model')
const Image = require('../models/image.model')
const multer = require('multer')
const fs = require('fs')
const path = require('path')


const Project = require('../models/project.model')
const Task = require('../models/task.model')
// Create A User
// exports.CREATE_USER = (req, res, next) => {
//     const name = req.body.name
//     const phone = req.body.phone
//     const password = req.body.password
    
//     const new_user = new User({
//         name: name,
//         phone:phone,
//         password: password
//     })

//     new_user.save()
//         .then(() => res.json("user Created"))
//         .catch(error => res.status(400).json('error' + error ))
//     }
// Get All Users
exports.GET_ALL_USERS = (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(error => res.status(400).json('error '+ error))
}
// Get A Single User
exports.GET_USER = (req, res, next) => {
    User.findById(req.user.id)
        .then(user => res.status(200).json({
            message:'user found',
            result: user
        }))
        .catch(error => res.status(400).json('error' + error))
}
// Update a Single user
exports.UPDATE_USER = (req, res, next) => {
    // const name = req.body.name
            const email = req.body.email
            const password = req.body.password
            const firstname = req.body.firstname
            const lastname = req.body.lastname
            const profileimage = req.file.path
            const contact = req.body.contact 
            const occupation = req.body.occupation 
            const address = req.body.address

    User.findByIdAndUpdate(req.user.id,{
         firstname: firstname,
        lastname :lastname,
        password: password,
        email:email,
        profileimage: profileimage,
        contact: contact,
        occupation: occupation,
        address: address

    }).then(()=>{
        res.status(400).json({
            message:'user updated',
        })
    })
      .catch(err=>{
        res.status(400).json({
            message:'error updating user',
            err: err.message
        })
      })
   
}


// Configuring multer
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, path.join(__dirname, "../../public/uploads" ));
//   },
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).single("image");

// const storage = path =>{
//     multer.diskStorage({
//         destination: './uploads' + path,
//         filename: (req, file, cb) =>{
//             cb(null, `${Date.now()}-${file.originalname}`)
//         }
//     })
// }





 
// var upload = multer({ storage: storage });

// RECEIVE IMAGE
// exports.GET_PROFILE_IMAGE = (req, res)=>{
//     Image.find({}, (err, items)=>{
//         if(err){
//             console.log(error)
//             res.status(500).json({
//                 message:"An error occured while retrieving image",
//                 error: err.message
//             })
//         }else{
//             res.status(200).json({
//                 result: items
//             })
//         }
//     })
// }

// Upload image
// exports.UPLOAD_PROFILE_IMAGE = (req, res)=>{
//     const new_image = new Image({
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     })

//     new_image.save()
//         .then(result => {
//             User.findById(req.user.id)
//                .then(found_user=>{
//                    found_user.profileimage
//                })
//                .catch()
//         })
    
    

    // imgModel.create(obj, (err, item) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         // item.save();
    //         res.redirect('/');
    //     }
    // })

// }


// Delete a Single user
exports.DELETE_USER = (req, res, next) => {
    User.findByIdAndDelete(req.user.id)
        .then(user => res.json(user))
        .catch(error => res.status(400).json('error deleting'+ error))
}

// create project
exports.CREATE_PROJECT = (req, res) =>{
    const new_project = new Project({
        title:req.body.title,
        description: req.body.description,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        projectID: Math.floor(100000 + Math.random() * 90000),
        status: 'created'
    })
    
    new_project.save()
      .then((result) =>{
          User.findById(req.user.id)
          .then(found_user=>{
              found_user.projects.push(result)
              found_user.save()
              res.status(200).json({
                  message:"Project created successfully",
                  result: result
              })
          })
          .catch(err => {
              res.status(400).json({
                  message: "error adding project to user",
                  error: err.message
              })
          })
      })
      .catch(err =>{
        res.status(400).json({
            message: "error adding project to user",
            error: err.message
        })
      })
}


// GET USER PROJECTS
exports.GET_USER_PROJECTS = (req, res) => {
    User.findById(req.user.id)
        .populate('projects')
        .exec(function(err, user){
            
            if (err){
                return handleError(err)
            }
            const result = user.projects.map(project =>{
                
                return project
            })
            res.status(200).json({
                message: 'Projects found',
                result: result
            })
        })
}



// Get single project from a user
exports.GET_SINGLE_PROJECT = (req, res) =>{
    Project.findOne({projectID: req.params.projectID})
        .then(result => {
            res.status(200).json({
                message:"Project found",
                result: result
            })
        })
        .catch(error => {
            res.status(400).json({
                message:"Project Not Found",
                error: error
            })
        })
}

// update task state to working
exports.UPDATE_PROJECT_TO_WORKING = ( req,res) =>{
    Project.findOneAndUpdate({projectID: req.params.projectID},{status: 'working'})
        .then(result => {
            res.json({
                message:'project status updated to in progress',
                result: result
            })
        })
        .catch(error => {
            res.status(400).json({
                message:'error updating project',
                error: error.message
            })
        })
}

// update task state to completed
exports.UPDATE_PROJECT_TO_COMPLETED = ( req,res) =>{
    Project.findOneAndUpdate({projectID: req.params.projectID},{status: 'completed'})
        .then(result => {
            res.json({
                message:'project status updated to completed',
                result: result
            })
        })
        .catch(error => {
            res.status(400).json({
                message:'error updating project',
                error: error.message
            })
        })
}



// tasks section



// Create a single task and attach to a project
exports.CREATE_TASK = (req, res) =>{
    const new_task = new Task({
        title:req.body.title,
        description: req.body.description,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        taskID: Math.floor(100000 + Math.random() * 90000),
        status: 'created'
    })

    new_task.save()
      .then(result =>{
            console.log('task saved')
                Project.findOne({projectID: req.params.projectID})
                .then(found_project=>{
                    console.log('project found')
                    found_project.tasks.push(result)
                    found_project.save()
                    res.status(200).json({
                        message: "Task created succesfully ",
                       result: result
                    }) 
                })
                .catch(error => {
                    res.status(400).json({
                        message: "error adding task to project",
                        error: error.message
                    })
                })
      })
      .catch(error =>{
        res.status(400).json({
            message: "error saving task",
            error: error.message
        })
      })
}

// get all tasks from a project 
exports.GET_PROJECT_TASKS  = (req, res) => {
    Project.findOne({projectID: req.params.projectID})
        .populate('tasks')
        .exec(function(err, project){
            if (err){
                return handleError(err)
            }
            const result = project.tasks.map(task =>{
               return task
            })
            res.status(200).json({
                message: 'Tasks from project found',
                result: result
            })
        })
}

// get a single task from a project 
exports.GET_SINGLE_TASK = (req, res) => {
    Task.findOne({taskID: req.params.taskID})
    .then(result => {
        res.status(200).json({
            message: "Task Found",
            result: result
        })
    })
    .catch(error =>{
        res.status(400).json({
            message: "error finding task",
            error: error.message
        })
    })
}


// update task state to working
exports.UPDATE_TASK_TO_WORKING = ( req,res) =>{
    Task.findOneAndUpdate({taskID: req.params.taskID},{status: 'working'})
        .then(result => {
            res.json({
                message:'task status updated to in progress',
                result: result
            })
        })
        .catch(error => {
            res.status(400).json({
                message:'error updating task',
                error: error.message
            })
        })
}

// update task state to completed
exports.UPDATE_TASK_TO_COMPLETED = ( req,res) =>{
    Task.findOneAndUpdate({taskID: req.params.taskID},{status: 'completed'})
        .then(result => {
            res.json({
                message:'task status updated to completed',
                result: result
            })
        })
        .catch(error => {
            res.status(400).json({
                message:'error updating task',
                error: error.message
            })
        })
}