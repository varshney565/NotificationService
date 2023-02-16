/**
 * this file will have the logic to validate the request body for activities related to notifications.
 */

const { notification } = require("../model");

/**
 * validator for request body for accepting the req body.
 */
exports.validatorForNotificationAccepter = (req,res,next)=>{
    /**
     * check whether subject,recepientEmails,content,requester has been provided in the req body or not.
     */
    if(!req.body.subject){
        console.log("Subject is required !");
        return res.status(400).send({
            message : "No subject provided !"
        })
    }

    if(!req.body.recepientEmails){
        console.log("recepientEmail is required !");
        return res.status(400).send({
            message : "No recepientEmail provided !"
        })
    }

    if(!req.body.requester){
        console.log("requester is required !");
        return res.status(400).send({
            message : "No requester provided !"
        })
    }

    if(!req.body.content){
        console.log("content is required !");
        return res.status(400).send({
            message : "No content provided !"
        })
    }

    //everything is ok.
    next();
}


/**
 * validator for req body for tracking a request.
 */

exports.validatorForTrackingRequest = async (req,res,next)=>{
    /**
     * fetch the tracking id from path param
     */
    const id = req.params.id;
    /**
     * check if id is valid moongoose id or not 
     * and if yes check if there is any notification with that id or not.
     */
    if(!require('mongoose').Types.ObjectId.isValid(id)){
        console.log("Not a valid tracking id !");
        return res.status(400).send({
            message : "Not a valid tracking id !"
        })
    }

    const noti = await notification.findOne({_id : id});
    if(!noti){
        console.log("No notification exists with that id.");
        return res.status(400).send({
            message : "No such notification with that tracking id !"
        });
    }
    /**
     * everything is ok.
     */
    next();
}