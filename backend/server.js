const fs = require('fs');
const rateLimit = require('express-rate-limit');
const slowDown = require("express-slow-down");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
var path = require('path')
var rfs = require('rotating-file-stream')
const Sentry = require('@sentry/node');

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: 'https://ebe7cda610d24b159425f7f43c5d3662@o382800.ingest.sentry.io/5212202' });
}

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 500 // limit each IP to 1000 requests per windowMs
});

const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000, // 1 minutes
  delayAfter: 500, // allow 100 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100:
});

var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

process.env.NODE_ENV = 'development';

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const db = require('./db.js');


const local = {
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV
};

const allowedOrigins = [
  'https://ministryofchange.org',
  'https://www.ministryofchange.org'
]

if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: (origin, callback) => {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  maxAge: 86400,
  credentials: true 
  }));
} else {
  app.use(cors({ 
    maxAge: 86400,
    origin: 'http://localhost:3000', 
    credentials: true
  }));
}

app.use(cookieParser())
app.use(express.json());
app.use(limiter);
app.use(speedLimiter);
app.use(morgan('combined', { stream: accessLogStream }))

const supplierRouter = require('./routes/supplierRouter');
const eventRouter = require('./routes/eventRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authController');
const resetRouter = require('./routes/resetRouter');
const s3Router = require('./routes/s3Controller');
const emailVerificationRouter = require('./routes/emailVerificationRouter');
const infoRouter = require('./routes/infoRouter');
const cnicRouter = require('./routes/cnicRouter');
const groupRouter = require('./routes/groupController');
const projectRouter = require('./routes/projectRouter');


app.use('/api/supplier', supplierRouter);
app.use('/api/project', projectRouter);
app.use('/api/event', eventRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/reset', resetRouter);
app.use('/api/imageUpload', s3Router.sign_s3);
app.use('/api/getCnicUpload', s3Router.uploadDocument);
app.use('/api/emailVerification', emailVerificationRouter.router);
app.use('/api/info', infoRouter);
app.use('/api/cnic', cnicRouter);
app.use('/api/group', groupRouter);

app.listen(local.port, () => {
  console.log(`HTTP server is running on port: ${local.port}`);
  console.log(local.environment);
});