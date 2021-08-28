
const express = require('express')
const router = express.Router()
// const upload = require('../utils/multer')
const userController = require('../controllers/user.controller')
const isAuth = require('../middlewares/isAuth')


// create user
// router.post('/', isAdmin, userController.CREATE_USER)

// get all users
router.get('/', isAuth, userController.GET_ALL_USERS)
// get a single user
router.get('/:username', isAuth, userController.GET_USER)
// update user
router.put('/:username', isAuth, userController.UPDATE_USER)
// delete a single user
router.delete('/:username', isAuth, userController.DELETE_USER)
// uploadimage
// router.put('/:username/profileimage', isAuth, userController.UPDATE_USER_IMAGE )


// Project
router.get('/:username/projects', isAuth, userController.GET_USER_PROJECTS)
router.post('/:username/projects', isAuth, userController.CREATE_PROJECT)
router.get('/:username/projects/:projectID', userController.GET_SINGLE_PROJECT)

// Tasks
router.get('/:username/projects/:projectID/tasks', isAuth, userController.GET_PROJECT_TASKS)
router.post('/:username/projects/:projectID/tasks', isAuth, userController.CREATE_TASK)
router.get('/:username/projects/:projectID/tasks/:taskID', isAuth, userController.GET_SINGLE_TASK)



// Task section
module.exports = router