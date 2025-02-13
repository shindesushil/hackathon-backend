const jwt = require('jsonwebtoken');
const { messages } = require('../constants/messages');
const { errorCode } = require('../constants/errorCode');

const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: '4h' };
  return jwt.sign(payload, secret, options);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error(messages.INVALID_TOKEN);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
