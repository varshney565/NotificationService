/**
 * this file will expose all the schemas.
 */

const mongoose = require('mongoose');

const notification = require('./notification.model')(mongoose);
module.exports = {
    notification : notification
};