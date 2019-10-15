const handler = (req, res, error) => {
  // error handler
  console.error(error);
  return res.status(500).json(error);
};

module.exports = (app) => app.use(handler);
