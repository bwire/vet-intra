const { serverErrors: { unathorized } } = require('../../helpers');

module.exports = (req, res, next) => req.isAuthenticated() ? next() : unathorized(res);
