

/** @format 
 * @params {array} properties - an array of strings
 * @returns {function} - an async function
*/

function hasProperties(properties) {
	return function (req, res, next) {
		const { data = {} } = req.body;
		const missingProperties = properties.filter((property) => !data[property]);

		if (missingProperties.length > 0) {
			const errors = missingProperties.map(property => new Error(`A '${property}' is required.`));
			errors.forEach(error => {
				error.status = 400;
				next(error);
			});
		} else {
			next();
		}
	};
}

module.exports = hasProperties;
