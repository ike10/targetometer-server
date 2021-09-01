const multer = require('multer')
const Router = require('express').Router()
// const upload = require('../utils/multer')
const userController = require('../controllers/user.controller')
const isAuth = require('../middlewares/isAuth')


const fileFilter = (req, file, cb)=>{
    // accept a file
 if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
     cb(null, true)
 }else{
     // reject a file
     cb(null, false)
 }
 
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename:function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    },

})



const upload = multer({storage : storage,
     limits:{
    fileSize: 1024 * 1024 * 5
},
    fileFilter: fileFilter
})



// create user
// router.post('/', isAdmin, userController.CREATE_USER)

// get all users
Router.get('/', isAuth, userController.GET_ALL_USERS)
// get a single user
Router.get('/:userID', isAuth, userController.GET_USER)
// update user
Router.put('/:userID', isAuth, upload.single('profileimage'), userController.UPDATE_USER)

// Upload image
// Router.put('/:userID/profileimage', isAuth, upload.single('profileimage'), (req, res, next)=>{
//     console.log(req.file)
//     res.status(200).json({
//         message: 'image uploaded'
//     })
// })

// Router


// delete a single user
Router.delete('/:userID', isAuth, userController.DELETE_USER)
// uploadimage
// router.put('/:username/profileimage', isAuth, userController.UPDATE_USER_IMAGE )


// Project
Router.get('/:userID/projects', isAuth, userController.GET_USER_PROJECTS)
Router.post('/:userID/projects', isAuth, userController.CREATE_PROJECT)
Router.get('/:userID/projects/:projectID', userController.GET_SINGLE_PROJECT)
Router.put('/:userID/projects/:projectID/completed', userController.UPDATE_PROJECT_TO_COMPLETED)
Router.put('/:userID/projects/:projectID/working', userController.UPDATE_PROJECT_TO_WORKING)
// Tasks
Router.get('/:userID/projects/:projectID/tasks', userController.GET_PROJECT_TASKS)
Router.post('/:userID/projects/:projectID/tasks', isAuth, userController.CREATE_TASK)
Router.get('/:userID/projects/:projectID/tasks/:taskID', isAuth, userController.GET_SINGLE_TASK)

Router.put('/:userID/projects/:projectID/tasks/:taskID/completed', userController.UPDATE_TASK_TO_COMPLETED)
Router.put('/:userID/projects/:projectID/tasks/:taskID/working', userController.UPDATE_TASK_TO_WORKING)


// Task section
module.exports = Router