const handler = (req, res, error) => {
  console.error(error);
  return res.status(500).json(error);
};

module.exports = (app) => app.use(handler);
