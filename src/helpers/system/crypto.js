const crypto = require('crypto');

const hash = (str) => crypto.createHmac('sha256', process.env.HASHING_SECRET).update(str).digest('hex');

module.exports = {
  hash,
};
