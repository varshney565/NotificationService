/**
 * this file will have the logic to create a notification and track a notification.
 */

const {notification} = require('../model');

/**
 * create a notification.
 * 
 * 
 * validation of notification request body ,should be written at middleware.
 */
exports.acceptNotificationRequest = async (req,res)=>{
    /**
     * create notification object that is needed to be inserted in the database.
     */
    const notificationPassed = {
        subject : req.body.subject,
        content : req.body.content,
        requester : req.body.requester,
        recepientEmails : req.body.recepientEmails
    }
    try{
        /**
         * insert the notification in the database.
         */
        const newNotification = await notification.create(notificationPassed);
        /**
         * return the tracking id.
         */
        res.status(201).send({
            message : "reuest has been accepted !",
            trackingId : newNotification._id
        });
    }catch(err){
        console.log(err);
        res.status(500).send({
            message : err.name || "Internal Error"
        });
    }
}

/**
 * track a notification.
 * 
 * validation of id will be done in the middleware
 */

exports.trackNotification = async (req,res)=>{
    /**
     * fetch the tracking id that has been passed in the path param.
     */
    const id = req.params.id;
    try{
        /**
         * fetch the notification.
         */
        const notify = await notification.findOne({_id : id});
        /**
         * send the notification status.
         */
        res.status(200).send({
            status : notify.status
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            message : err.name || "Internal Error"
        })
    }
}