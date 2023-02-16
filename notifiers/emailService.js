/**
 * this file will have the transporter object which is responsible for sending the emails.
 */
const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    port : 465,
    service : "gmail",
    auth : {
        user : process.env.email,
        pass : process.env.password,
    },
    secure : true,
});