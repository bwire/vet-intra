const unathorized = (res, message = 'Unathorized') => res.status(401).json({ message });
const forbidden = (res, message = 'Forbidden') => res.status(403).json({ message });

module.exports = {
  unathorized,
  forbidden,
};
