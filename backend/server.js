const https = require('https');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const slowDown = require("express-slow-down");
const morgan = require('morgan');
var path = require('path')
var rfs = require('rotating-file-stream')
const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'https://ebe7cda610d24b159425f7f43c5d3662@o382800.ingest.sentry.io/5212202' });

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100:
});

var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const db = require('./db.js');

process.env.NODE_ENV = 'development';

const local = {
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV
};

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(speedLimiter);
app.use(morgan('combined', { stream: accessLogStream }))

const supplierRouter = require('./routes/supplierRouter');
const rationEventRouter = require('./routes/rationEventRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authController');
const resetRouter = require('./routes/resetRouter');
const s3Router = require('./routes/s3Controller');
const emailVerificationRouter = require('./routes/emailVerificationRouter');

app.use('/api/supplier', supplierRouter);
app.use('/api/rationEvent', rationEventRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/reset', resetRouter);
app.use('/api/imageUpload', s3Router.sign_s3);
app.use('/api/emailVerification', emailVerificationRouter.router);

var httpsServer = https.createServer(options, app);

if (local.environment === 'production') {
  httpsServer.listen(local.port, () => {
    console.log(`HTTPS server is running on port: ${local.port}`)
  })
} else {
  app.listen(local.port, () => {
    console.log(`HTTP server is running on port: ${local.port}`);
    console.log(local.environment);
  });
}