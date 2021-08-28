const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    port : process.env.PORT,
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
    secretToken: process.env.SECRET_JWT_TOKEN,
    twilio_number: process.env.TWILIO_NUMBER,
    twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
    twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD
}