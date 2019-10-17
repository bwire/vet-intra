const authRoutes = require('./auth-routes');
const userRoutes = require('./user-routes');

const isAuthenticated = require('../middleware/guards/is-authenticated');

const routes = (app) => {
  app.use('/auth', authRoutes);
  app.use('/user', isAuthenticated, userRoutes);
};

module.exports = routes;
