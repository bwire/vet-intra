const AuthRoutes = require('./auth-routes');
const UserRoutes = require('./user-routes');

const isAuthenticated = require('../middleware/guards/is-authenticated');

const routes = (app) => {
  app.use('/auth', AuthRoutes);
  app.use('/user', isAuthenticated, UserRoutes);
};

module.exports = routes;
