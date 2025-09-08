const session = require('express-session');
const  MongoStore = require('connect-mongo');
const cookie = require('express-session/session/cookie');

const sessionConfig = {
    secret: '123456789',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/newspapers' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 hour
};

module.exports = sessionConfig;