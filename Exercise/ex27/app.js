// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const articleRouter = require('./routes/articleRouter');
const commentRouter = require('./routes/commentRouter');

// Session config
const sessionConfig = require('./config/sessionConfig');

// Initialize app
const app = express();

// ──────────────────────────────────────────────────────────────
// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ──────────────────────────────────────────────────────────────
// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));
app.use(cors());
app.use(helmet());

// ──────────────────────────────────────────────────────────────
// MongoDB Connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ──────────────────────────────────────────────────────────────
// Passport (Facebook OAuth)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "https://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'emails', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
  console.log("Facebook profile:", profile);
  return done(null, profile);
}));

// ──────────────────────────────────────────────────────────────
// Facebook Auth Routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    const payload = {
      facebookId: req.user.id,
      username: req.user.displayName
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  }
);

// ──────────────────────────────────────────────────────────────
// JWT Middleware for Article Routes
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided!' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// ──────────────────────────────────────────────────────────────
// Your App Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', (req, res, next) => verifyToken(req, res, next), articleRouter);
app.use('/comments', commentRouter);

// ──────────────────────────────────────────────────────────────
// Home Route
app.get('/', (req, res) => {
  res.send('✅ Welcome to your application with Facebook OAuth and JWT integrated!');
});

// ──────────────────────────────────────────────────────────────
// Error Handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ message: err.message, stack: res.locals.error.stack });
});

module.exports = app;
