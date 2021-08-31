const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
const {secretToken} = require('../utils/config')
// const otpGenerator = require('otp-generator')
const Token = require('../models/token.model')
// const twilio_client = require('twilio')(twilio_account_sid, twilio_auth_token)
const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
sgMail.setApiKey('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')



exports.CreateAccount =  (req, res) => {
   
    const password = req.body.password
    const email = req.body.email
    const firstname = req.body.firstname
   const status = req.body.status
    const lastname = req.body.lastname


    User.findOne({email:email})
    .then(result=>{
        if (result){
        res.status(400).json({
            message:"User already exists",
            
        })
    }else{
            const new_user = new User({
                email: email,
                password: password,
               firstname: firstname,
                lastname: lastname,
                status: status,
                userID: Math.floor(100000 + Math.random() * 90000)
            })
            return    new_user.save()
            //     res.status(200).json({
            //         message:"New user is created",
            //         result: result
            //    })

        }
    })
    .then(result => {
        console.log(result)
        // create token
       const tokenid = otpGenerator.generate(6, { digits: true })
        var token = new Token({
            _userId: result._id.toString(),
            token: tokenid
        })
        token.save(function (err) {
        if(err){
            return res.status(400).send({msg:'error saving token', error:err});
        }
        // send email
        const msg = {
            to: `${result.email}`, // Change to your recipient
            from: `intiencelabs@gmail.com`, // Change to your verified sender
            subject: 'Please verify your account',
            text: `Your verification code is ${tokenid}, please go to the link below and enter it`,
            html: `<p>Your verification code is: <strong> ${tokenid} </strong> </p>`,
          }
          
          sgMail
            .send(msg)
            .then((response) => {
              console.log(response[0].statusCode)
              console.log(response[0].headers)
            })
            .catch((error) => {
              console.error(error)
            })

    })
    res.status(200).json({
        message: `user created check your email for verification code`,
        result: result,
        
    })
})


    .catch(error =>{
        res.status(400).json({
            message:"error finding user ",
            error: error.message
        })
    })

    // console.log(password, email)
    // User.findOne({email:email})
    //     .then(olduser =>{
    //         // console.log(olduser)
    //         if (olduser){
    //             res.status(400).json({message:"user already exists"})
    //         } else {
    //             bcrypt.genSalt(12)
    //             .then(salt => {
    //             bcrypt.hash(password, salt)
    //                 .then(hashedPassword => {
    //                     const NewUser = new User({
    //                         email: email,
    //                         password: hashedPassword,
    //                         firstname: firstname,
    //                         lastname: lastname
    //                 })  
    //                     return NewUser.save()
    //                 })
    //                 .then(result =>{ 
    //                     console.log(result)
    //                     res.status(200).json({message: 'user created', user: result})
    //                 })
    //                 .catch(error => res.status(400).json({message:'error hashing i wan chechpassword', error: error.message}))
    //                 })
    //                 .catch(error => res.status(500).json({message:'error generating salt', error: error}))
    //             }
    //     })
    //     .catch(error=>res.status(400).json({
    //         message:'error finding user',
    //         error: error.message
    //     }))

        
    
}

exports.Login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser
    

    User.findOne({email:email})
        .then(user =>{
          if(user.isVerified) { 
            if (user.password == password){
               loadedUser = user 
                const jwttoken = jwt.sign(
                    {
                        email: loadedUser.email,
                        id: loadedUser._id.toString(),
                    },
                    secretToken,
                    {expiresIn : "1h"}
                )
                res.status(200).json({
                    message:"user logged in succesfully",
                    data: user,
                   token: jwttoken,
                   id: loadedUser._id.toString(), 
                })
            } else{
                res.status(400).json({
                    message: "Password does not match"
                })
            }
        }else{
            res.status(400).json({
                message:"You are not verified, please check your email and verify your account"
            })
        }
        })
        .catch(error => {
            res.status(400).json({
                message: 'user not found',
                error: error.message
            })
        })

     
    // User.findOne({email: email})
    // .then(user => {
    //     if (user.isVerified){
    //         loadedUser = user
    //         bcrypt.compare(password, user.password)
    //         .then(isEqual => {
    //             const jwttoken = jwt.sign(
    //                       {
    //                         email: loadedUser.email,
    //                         id: loadedUser._id.toString(),
    //                       },
    //                       secretToken,
    //                       { expiresIn: "1h" }
    //                     );
    //                 res.status(200).json({ 
    //                     token: jwttoken, 
    //                     id: loadedUser._id.toString(), 
    //                     user: loadedUser 
    //                 })
    //         })
    //         .catch(error => {
    //             res.status(400).json({
    //                 message: 'password does not match',
    //                 error: error.message
    //             })
    //         })
    //     } else {
    //         res.status(400).json({
    //             message: 'your email has not been verified'
    //         })
    //     }
    // })
    // .catch(error => {
    //     res.status(400).json({
    //         message: 'user not found',
    //         error: error.message
    //     })
    // })


    // console.log('endpoint hit')
    // let loadedUser;
    // console.log('seacrhing for user')
    // User
    //   .findOne({ email: email })
    //   .then((user) => {
    //     if (!user) {
    //         console.log('user with this email could not be found')
    //       const error = new Error("A user with this email could not be found");
    //       error.statusCode = 401;
    //       throw error;
          
    //     }
        
    //     if (!user.isVerified){
    //         return res.status(401).send({msg:'Your email has not been verified.'});
    //     }
    //     console.log('your email has been verified')
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
    //         email: loadedUser.email,
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

exports.ConfirmEmail = (req, res) => {

    const emailtoken = req.body.token

    Token.findOne({token: emailtoken})
        .then(token =>{
            // if token is not found
            // if(!token){
            //     return res.status(400).send({message:'Your Verfication Link May have expired, please try again'})
            // }
            // if token is found check for valid user
            // else{
               
                User.findOne({_id: token._userId})
                    .then(user =>{
                        if(!user){
                            return res.status(401).send({message: 'We were not able to find a user for this token'})
                        }
                        // if user is verified
                        else if (user.isVerified){
                            return res.status(200).send('User has already been verified, please Login')
                        }

                        else{
                            // change verification to true
                            user.isVerified = true
                            user.save()
                                .then(result => res.status(200).send('your account has been succesfully verified'))
                                .catch(error => res.status(500).json({message: 'error verifying account', error: error.message})) 
                        }

                    })
                    .catch(error => res.status(400).json({message:"error finding account with this token", error: error.message}))
            // }

        })
        .catch(error => res.status(400).json({message:"error finding this token", error: error.message}))
}

// exports.ResendVerificationLink= (req, res)=>{
//     const user = req.body.user
//     const tokenid = otpGenerator.generate(6, { digits: true })
//     var token = new Token({
//         _userId: result._id.toString(),
//         token: tokenid
//     })
//     token.save(function (err) {
//     if(err){
//         return res.status(400).send({msg:'error saving token', error:err});
//     }
//     // send email
//     const msg = {
//         to: `${result.email}`, // Change to your recipient
//         from: `intiencelabs@gmail.com`, // Change to your verified sender
//         subject: 'Please verify your account',
//         text: `Your verification code is ${tokenid}, please go to the link below and enter it`,
//         html: `<a href=${'https://silly-beaver-8aa69f.netlify.app/verifyuser'}>Verification link</a>`,
//       }
      
//       sgMail
//         .send(msg)
//         .then((response) => {
//           console.log(response[0].statusCode)
//           console.log(response[0].headers)
//         })
//         .catch((error) => {
//           console.error(error)
//         })

// })
// }

exports.Logout = (req, res) =>{
    res.cookie('jwt','', {maxAge: 1})

    res.redirect('/')
}