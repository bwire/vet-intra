const unauthorized = (res, message = 'Unauthorized request') => res.status(401).json({ message });
const forbidden = (res, message = 'Forbidden') => res.status(403).json({ message });

module.exports = {
  unauthorized,
  forbidden,
};
