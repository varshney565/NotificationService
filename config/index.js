/**
 * this file will have the logic to set all the configurable data to the global object.
 *      -- process.env
 * if not_env is developer
 */

if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}