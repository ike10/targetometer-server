const mongoose = require('mongoose')
const {mongoConnectionString} = require('./config')
const db = async () =>{
    

    try {
        const conn = await mongoose.connect(mongoConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
       
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = db