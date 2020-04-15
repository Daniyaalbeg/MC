const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const db = require('./db.js');

const local = {
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development'
};

app.use(cors());
app.use(express.json());

const supplierRouter = require('./routes/supplierRouter');
const rationEventRouter = require('./routes/rationEventRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authController');
const resetRouter = require('./routes/resetRouter');

app.use('/supplier', supplierRouter);
app.use('/rationEvent', rationEventRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/reset', resetRouter);

var httpsServer = https.createServer(options, app);

if (local.environment == 'production') {
  httpsServer.listen(local.port, () => {
    console.log(`HTTPS server is running on port: ${local.port}`)
  })
} else {
  app.listen(local.port, () => {
    console.log(`HTTP server is running on port: ${local.port}`);
    console.log(local.environment);
  });
}