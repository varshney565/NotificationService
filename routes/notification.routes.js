const { acceptNotificationRequest, trackNotification } = require("../controller/notification.controler");
const { validatorForNotificationAccepter, validatorForTrackingRequest } = require("../middleware/notification.validator");

module.exports = (app)=>{
    /**
     * route for accepting the notification and storing it in the database.
     * 
     * POST + https://127.0.0.1:8045/notiserv/api/v1/notifications
     */
    app.post("/notiserv/api/v1/notifications",[validatorForNotificationAccepter],acceptNotificationRequest);
    /**
     * route for tracking a request
     * 
     * GET + https://127.0.0.1:8045/notiserv/api/v1/notifications/:id
     */
    app.get("/notiserv/api/v1/notifications/:id",[validatorForTrackingRequest],trackNotification);
}