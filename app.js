const express = require('express')

const db = require('./app/utils/db')

const cors = require('cors')
const app = express()

const dotenv = require('dotenv')

// Routes
const AuthRoutes = require('./app/router/auth.router')
const UserRoutes = require('./app/router/user.router')



// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.json())

app.use(express.static(__dirname));
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'})

dotenv.config({path: './.env'})
// app.use(morgan('combined', {stream: accessLogStream}))
app.use(cors())
const port = process.env.PORT
// Connect Database
db()
app.set('trust proxy', true);

// Load error
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

// app.use(morgan('combined', {stream: accessLogStream}))
app.use('/api/v1/auth/', AuthRoutes)
app.use('/api/v1/users/', UserRoutes)
// app.use('/api/v1/companies/', CompanyRoutes)
// app.use('/api/v1/routes/', RouteRoutes)

// app.get('/favicon.ico', function(req, res) { 
//     res.status(204);
//     res.end();    
// });
// app.get('/', (req, res)=>{
//     res.send('hello world')
// })


app.listen(
    port,()=>{
    console.log(`new post is running on ${port} `)
})