const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {secretToken, twilio_account_sid, twilio_auth_token, twilio_number} = require('../utils/config')
const otpGenerator = require('otp-generator')
const Token = require('../models/token.model')
const twilio_client = require('twilio')(twilio_account_sid, twilio_auth_token)


exports.CreateAccount =  (req, res) => {
    
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
   
    const role = req.body.role
    // console.log(password, phone)
    User.findOne({email:email})
        .then(olduser =>{
            // console.log(olduser)
            if (olduser){
                res.status(400).json({
                    message: "user already exists",
                    error:"request failed with status code 400"
                })
            } else {
                bcrypt.genSalt(12)
                .then(salt => {
                bcrypt.hash(password, salt)
                    .then(hashedPassword => {
                        const NewUser = new User({
                            email: email,
                            password: hashedPassword,
                            firstname: firstname,
                            lastname: lastname
                    })  
                        return NewUser.save()
                    })
                    .then(result =>{ 
                        // console.log(`the result before token is${result}`)

                        // jtw token
                        // jwt.sign({
                        //     phone: result.phone,
                        //     id: result._id.toString(),
                        // },
                        //     secretToken,
                        //     { expiresIn: "1h" }
                        // )
                        // generate token and send to user phone
                    //     const tokenid = otpGenerator.generate(6, { digits: true })
                    //     var token = new Token({
                    //         _userId: result._id.toString(),
                    //         token: tokenid
                    // })
                //     token.save(function (err) {
                //     if(err){
                //         return res.status(500).send({msg:'error saving token', error:err});
                //     }
                //     // Send Confirmation Email
                    
                //     twilio_client.messages
                //         .create({
                //             body: `Welcome to Cruise9ja, Your Verification code is: ${tokenid} `,
                //             from: `${twilio_number}`,
                //             to: result.phone
                //         })
                //         .then(message=>console.log(message.sid))
                      
                //  })
                        res.status(200).json({message: 'user created',
                         user: result, 
                        //  token: token
                        })
                    })
                    .catch(error => res.status(400).json({message:'error hashing password', error: error.message}))
                    })
                    .catch(error => res.status(500).json({message:'error generating salt', error: error}))
                }
        })
        .catch(error=>res.status(400).json({
            message:'Error With Creating Account',
            error: error.message
        })
        )

        

    
}

exports.Login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser
    
     
    User.findOne({email: email})
    .then(user => {
        if (user.isVerified){
            loadedUser = user
            bcrypt.compare(password, user.password)
            .then(isEqual => {
                const jwttoken = jwt.sign(
                          {
                            email: loadedUser.email,
                            id: loadedUser._id.toString(),
                          },
                          secretToken,
                          { expiresIn: "1h" }
                        );
                    res.status(200).json({ 
                        token: jwttoken, 
                        id: loadedUser._id.toString(), 
                        user: loadedUser 
                    })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'password does not match',
                    error: error.message
                })
            })
        } else {
            res.status(400).json({
                message: 'your email has not been verified'
            })
        }
    })
    .catch(error => {
        res.status(400).json({
            message: 'user not found',
            error: error.message
        })
    })


    // console.log('endpoint hit')
    // let loadedUser;
    // console.log('seacrhing for user')
    // User
    //   .findOne({ phone: phone })
    //   .then((user) => {
    //     if (!user) {
    //         console.log('user with this phone could not be found')
    //       const error = new Error("A user with this phone could not be found");
    //       error.statusCode = 401;
    //       throw error;
          
    //     }
        
    //     if (!user.isVerified){
    //         return res.status(401).send({msg:'Your phone has not been verified.'});
    //     }
    //     console.log('your phone has been verified')
    //     loadedUser = user;
    //     return bcrypt.compare(password, user.password);
    //   })
    //   .then((isEqual) => {
    //       console.log('password matches')
    //     if (!isEqual) {
    //       const error = new Error("wrong password");
    //       error.statusCode = 401;
    //       throw error;
    //     }
        
    //     const jwttoken = jwt.sign(
    //       {
    //         phone: loadedUser.phone,
    //         id: loadedUser._id.toString(),
    //       },
    //       secretToken,
    //       { expiresIn: "1h" }
    //     );
    //     console.log('signing token')
    //     res.status(200).json({ token: jwttoken, id: loadedUser._id.toString(), user: loadedUser });
    //   })
    //   .catch((err) => {
    //     if (!err.statusCode) {
    //       err.statusCode = 500;
    //     }
    //     console.log('login successful')
    //   });
}

// exports.ConfirmEmail = (req, res) =>{

//     const phonetoken = req.body.token

//     Token.findOne({token: phonetoken})
//         .then(token =>{
//             // if token is not found
//             if(!token){
//                 return res.status(400).send({message:'Your Verfication Link May have expired, please try again'})
//             }
//             // if token is found check for valid user
//             else{
                
//                 User.findOne({_id: token._userId})
//                     .then(user =>{
//                         if(!user){
//                             return res.status(401).send({message: 'We were not able to find a user for this token'})
//                         }
//                         // if user is verified
//                         else if (user.isVerified){
//                             return res.status(200).send('User has already been verified, please Login')
//                         }

//                         else{
//                             // change verification to true
//                             user.isVerified = true
//                             user.save()
//                                 .then(result => res.status(200).send('your account has been succesfully verified'))
//                                 .catch(error => res.status(500).json({message: 'error verifying account', error: error})) 
//                         }

//                     })
//                     .catch(error => res.status(400).json({message:"error finding account with this token", error: error}))
//             }

//         })
//         .catch(error => res.status(400).json({message:"error finding this token", error: error}))
// }

// exports.ResendVerificationLink= (req, res)=>{
    
// }

exports.Logout = (req, res) =>{
    res.cookie('jwt','', {maxAge: 1})

    res.redirect('/')
}