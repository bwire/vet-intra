const { serverErrors: { unauthorized } } = require('../../helpers');

module.exports = (req, res, next) => req.isAuthenticated() ? next() : unauthorized(res);
