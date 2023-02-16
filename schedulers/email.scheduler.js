/**
 * this file will have the logic to fetch all the unsent requests(in the pending state) from db and 
 * send the mail to all the recepients after every 5 minute.
 */

const cron = require('node-cron');

/**
        # ┌────────────── second (optional)
        # │ ┌──────────── minute
        # │ │ ┌────────── hour
        # │ │ │ ┌──────── day of month
        # │ │ │ │ ┌────── month
        # │ │ │ │ │ ┌──── day of week
        # │ │ │ │ │ │
        # │ │ │ │ │ │
        # * * * * * *

        second	        0-59
        minute	        0-59
        hour	        0-23
        day of month	1-31
        month	        1-12 (or names)
        day of week	    0-7 (or names, 0 or 7 are sunday)

 */

const { transporter } = require('../notifiers/emailService');
const { notification } = require('../model');
const { notificationStatus } = require('../utils/constants');

cron.schedule("*/5 * * * *",async ()=>{
    /**
     * find the notifications that are in pending state.
     */
    const nfs = await notification.find({status : notificationStatus.pending});
    console.log("Number of pending requests : "+nfs.length);
    /**
     * if notifications are there.
     */
    if(nfs.length > 0){
        /**
         * forEach behaves in sync manner.
         * */
        nfs.forEach(nf => {
            /**
             * fetch the mailObj.
             */
            const mailObj = {
                from : nf.requester,
                to : nf.recepientEmails,
                subject : nf.subject,
                text : nf.content
            }
            /**
             * send the email to all the notification.
             */
            transporter.sendMail(mailObj,async (err,data)=>{
                if(err){
                    console.log(err);
                    console.log("Some error happened while sending email !");
                }
                /**
                 * updating the status of the notification.
                 */
                nf.status = notificationStatus.success;
                await nf.save();
            })
        });
    }
});