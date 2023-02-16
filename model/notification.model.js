/**
 * this file will have the logic to create the schema of the notification.
 */

const { notificationStatus } = require("../utils/constants");

module.exports = (mongoose)=>{
    const notificationSchema = new mongoose.Schema({
        subject : {
            type : String,
            required : true
        },
        content : {
            type : String,
            required : true
        },
        requester : {
            type : String,
            required : true
        },
        recepientEmails : {
            type : String,
            required : true
        },
        status : {
            type : String,
            enum : [notificationStatus.success,notificationStatus.pending,notificationStatus.failed],
            required : true,
            default : notificationStatus.pending
        },
        createdAt : {
            type : Date,
            default : ()=>Date.now(),
            immutable : true
        },
        updatedAt : {
            type  : Date,
            default : ()=>Date.now()
        }
    },{versionKey : false});
    return mongoose.model('notification',notificationSchema);
}