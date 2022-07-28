const msg = require(`../message`);
const jwt = require("jsonwebtoken");
const dotenv = require(`dotenv`);
dotenv.config();

const validateToken = async (req, res, next) => {
  try {
    const secret = process.env.JWT_SECRET_KEY;

    const authHeader = req.headers["authorization"];

    if (authHeader === undefined) {
      res.json({
        code: 400,
        message: msg.tokenNotAvailble,
      });
    }

    const token = await authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        res.json({
          code: 403,
          message: msg.tokenInvaild,
        });
      } else {
        req.user = user;
        next();
      }
    });
  } catch (error) {}
};

module.exports = {
  validateToken,
};
