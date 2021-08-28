
const Router = require('express').Router()
// const upload = require('../utils/multer')
const userController = require('../controllers/user.controller')
const isAuth = require('../middlewares/isAuth')


// create user
// router.post('/', isAdmin, userController.CREATE_USER)

// get all users
Router.get('/', isAuth, userController.GET_ALL_USERS)
// get a single user
Router.get('/:userID', isAuth, userController.GET_USER)
// update user
Router.put('/:userID', isAuth, userController.UPDATE_USER)
// delete a single user
Router.delete('/:userID', isAuth, userController.DELETE_USER)
// uploadimage
// router.put('/:username/profileimage', isAuth, userController.UPDATE_USER_IMAGE )


// Project
Router.get('/:userID/projects', isAuth, userController.GET_USER_PROJECTS)
Router.post('/:userID/projects', isAuth, userController.CREATE_PROJECT)
Router.get('/:userID/projects/:projectID', userController.GET_SINGLE_PROJECT)

// Tasks
Router.get('/:userID/projects/:projectID/tasks', isAuth, userController.GET_PROJECT_TASKS)
Router.post('/:userID/projects/:projectID/tasks', isAuth, userController.CREATE_TASK)
Router.get('/:userID/projects/:projectID/tasks/:taskID', isAuth, userController.GET_SINGLE_TASK)



// Task section
module.exports = Router