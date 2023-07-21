/** @format
 * @params {function} delegate - an async function
 * @params {number} defaultStatus - a status code to use when none is provided
 * @returns {function} - an async function
 */

function asyncErrorBoundary(delegate, defaultStatus) {
	return (req, res, next) => {
		Promise.resolve()
			.then(() => delegate(req, res, next))
			.catch((error = {}) => {
				const { status = defaultStatus, message = error } = error;
				next({
					status,
					message,
				});
			});
	};
}

module.exports = asyncErrorBoundary;
