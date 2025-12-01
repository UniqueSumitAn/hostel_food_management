const jwt = require("jsonwebtoken");

const jwtSign =  (payload) => {
  return jwt.sign({ id: payload }, `${process.env.JWTSECRET}`);
};

module.exports = jwtSign;
