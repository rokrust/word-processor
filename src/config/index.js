require('dotenv').config()
const config = {
    'CLIENT_ID': process.env.REACT_APP_CLIENT_ID,
    'API_KEY': process.env.REACT_APP_API_KEY,
    'CLIENT_SECRET': process.env.REACT_APP_CLIENT_SECRET,
}
module.exports = config;