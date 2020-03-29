const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const local = {
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development'
};

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection succesful");
});

const supplierRouter = require('./routes/supplierRouter');
const rationEventRouter = require('./routes/rationEventRouter');
const loginRouter = require('./routes/loginRouter')

app.use('/supplier', supplierRouter);
app.use('/rationEvent', rationEventRouter);
app.use('/auth', loginRouter)

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