/**
 * express for creating the server.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
/**
 * body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended : true}));
/**
 * setting the configurable data to process.env.
 */
require('./config');

/**
 * making the connection with the database.
 */
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const database = mongoose.connection;

database.on('error',()=>{
    console.log("Some error while connecting to the database.");
})

database.once('open',()=>{
    console.log("Successfully connected with the database.");
})

/**
 * routes for notifications.
 */
require('./routes/notification.routes')(app);
/**
 * attaching the cron file.
 */
require('./schedulers/email.scheduler');
/**
 * starting the server.
 */

app.listen(process.env.PORT,()=>{
    console.log("server started running at port : ",process.env.PORT);
});
