const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const SECRET_KEY = 'your_jwt_secret'; // Secret key dùng cho JWT

// Giả lập danh sách người dùng với mật khẩu đã băm bằng bcrypt
const users = [
  { id: '1', username: 'admin', password: bcrypt.hashSync('admin123', 10) }, 
  { id: '2', username: 'user1', password: bcrypt.hashSync('password123', 10) }
];

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: '1234567',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 60000 } // HTTP nên để secure: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username);
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  bcrypt.compare(password, user.password, (err, res) => {
    if (res) {
      return done(null, user); // Đăng nhập thành công
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  });
}));

// Lưu user vào session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Lấy thông tin user từ session
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// Đăng ký người dùng mới
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).send('Username already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), username, password: hashedPassword };
  users.push(user);
  res.send('User registered');
});

// Đăng nhập bằng Passport (Session)
app.post('/login', passport.authenticate('local', {
  successRedirect: '/protected',
  failureRedirect: '/login-failed'
}));

// Đăng nhập bằng JWT
app.post('/login-jwt', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).send('Incorrect username');
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      res.send({ message: 'JWT token issued', token });
    } else {
      res.status(401).send('Incorrect password');
    }
  });
});

// Middleware kiểm tra xác thực JWT
const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

// Trang được bảo vệ bằng session
app.get('/protected', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello ${req.user.username}, you are authenticated with session!`);
  } else {
    res.status(401).send('You are not authenticated!');
  }
});

// Trang được bảo vệ bằng JWT
app.get('/protected-jwt', verifyJWT, (req, res) => {
  res.send(`Hello ${req.user.username}, you are authenticated with JWT!`);
});

// Đăng xuất (session)
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('token');
    res.send('You are logged out!');
  });
});

/*check session
app.get('/protected', (req, res) => {
  console.log("Session Data:", req.session); // In ra thông tin session
  if (req.isAuthenticated()) {
    res.send(`Hello ${req.user.username}, you are authenticated with session!`);
  } else {
    res.status(401).send('You are not authenticated!');
  }
});*/


// Server listen
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
