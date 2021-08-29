const jwt = require('jsonwebtoken')
const {secretToken} = require('../utils/config')

const isAuth = (req, res, next) =>{
    const authHeader = req.get('Authorization')

    if (!authHeader){
        res.status(401).json({message: 'not authorized'})
    }

    const token = authHeader.split(' ')[1]
    console.log(token)
    let decodedToken 

    try{

        decodedToken = jwt.verify(token, secretToken)
        console.log(decodedToken)
    }catch(error){
        res.status(400).json({
            message: 'error decoding token',
            error: error.message
        
        })
    }

    if (!decodedToken){
        res.status(401).json({message: 'not authorized'})
    }

    req.user = decodedToken

    next()
}

module.exports = isAuth