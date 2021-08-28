// const User = require('../models/user.model')
// const Project = require('../models/project.model')
// const Task = require('../models/task.model')
// const multer = require('multer')
// const fs = require('fs')
// const path = require('path')

// // Create Routes for a single Company
// exports.CREATE_PROJECT = (req, res)=>{
//     const new_project = new Route({
//         title:req.body.title,
//         description: req.body.description,
//         startdate: req.body.startdate,
//         enddate: req.body.enddate,
        
//     })
//     new_project.save()
//         .then(project =>{
//             User.findOne({"name":req.user.id})
//                 .then(user => {
//                     user.projects.push(route)
//                     user.save()
//                     // catch error you didnt
//                     res.status(200).json({
//                         message: 'New Project Created',
//                         result: project
//                     })
//                 })
//                 .catch(error => {
//                     res.status(400).json({
//                         message: 'Error: User not found',
//                         error: error
//                     })
//                 })
//         })
//         .catch(error => {
//             res.status(400).json({
//                         message: 'Error creating project',
//                         error: error
//                     })
//         })
// }

// // exports.GET_ALL_PROJECTS = (req, res) => {
// //     User.findOne({"projectID":req.params.projectID})
// //         .populate('tickets')
// //         .exec(function(err, route){
// //             if (err){
// //                 return handleError(err)
// //             }
// //             const result = route.tickets.map(ticket =>{
// //                 return ticket
// //             })
// //             res.status(200).json({
// //                 message: 'Tickets found',
// //                 result: result
// //             })
// //         })
// // }