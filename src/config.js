require('dotenv').config();

const config = {
    port: 3000,
    secret: process.env.TOKEN_SECRET
}

module.exports = config;