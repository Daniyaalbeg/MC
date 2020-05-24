const mongoose = require('mongoose');

let uri = null

if (process.env.NODE_ENV === "production") {
    uri = process.env.ATLAS_URI_PROD;
} else {
    uri = process.env.ATLAS_URI_TEST;
}

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection succesful in " +process.env.NODE_ENV+ ' mode');
});