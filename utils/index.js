/*
 * Utils
 *
 */

// var chalk = require('chalk');
var util = require('util');


/**
 * @summary Represents an error occurring when a requested resource fails.
 *
 * @alias utils.HttpError
 * @constructor
 * @param {integer} code - The error status code.
 * @param {string} message - The message to send to the client.
 */
function HttpError(code, message) {
    this.code = code;
    this.message = message || "";
    this.name = 'HttpError';
    Error.captureStackTrace(this, HttpError);
}
util.inherits(HttpError, Error);
exports.HttpError = HttpError;

/**
 * @summary Standard error handler for reporting thrown errors to the user.
 * @description
 * Note that this handler does not perform any manipulation to the errors besides simply
 * extracting the error code if available. This should not be a substitute for handling
 * specific errors that have the potential to leak information to the user (such as a route
 * that should respond with 404 instead of 403 to prevent acknowledgement to the client that
 * the resource exists, but that they don't have access to view it).
 *
 * @param {Request} req - An express.js request object.
 * @param {Response} res - An express.js response object.
 * @returns {function} An error handler function that is suitable for use in promise chains.
 */
exports.errorHandler = function(req, res) {
    return function(err) {
        if (!err) {
            console.log(chalk.red("[ERROR] Undefined exception was thrown"));
            res.status(500).end();
        } else if (typeof err.code === 'number' && err.code > 0) {
            if (err.message) {
                res.status(err.code).send(err.message);
            } else {
                res.status(err.code).end();
            }
        } else if (err.cause && err.cause.name === 'ValidationError') {
            res.status(422).send(err.message);
        } else if (err.cause && typeof err.cause.sqlState === 'string') {
            if (err.cause.code === 'ER_DUP_ENTRY') {
                res.status(409).end();
            } else if (err.cause.code === 'ER_NO_REFERENCED_ROW_') {
                res.status(404).end();
            } else if (err.cause.code === 'ER_WARN_DATA_OUT_OF_RANGE') {
                var message = err.message.substr(27);
                message = message.substring(0, message.lastIndexOf(' at row'));
                res.status(400).send(message);
            } else {
                res.status(400).end();
            }
        } else {
            console.log(chalk.red("[WARNING] Unhandled or unrecognized exception was thrown:"));
            console.log(err.stack || err);
            res.status(500).end();
        }
    };
};