/** @format 
 * @params {object} req - the request object
 * @params {object} res - the response object
 * @params {function} next - the next function
 * @returns {function} - an async function
*/

function methodNotAllowed(req, res, next) {
	next({
		status: 405,
		message: `${req.method} not allowed for ${req.originalUrl}`,
	});
}

module.exports = methodNotAllowed;
