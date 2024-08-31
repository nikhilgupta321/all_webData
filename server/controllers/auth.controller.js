const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { expressjwt: expressJwt } = require("express-jwt")
const { config } = require('../config/config')
const Setting = require('../models/setting.model')


const verifyToken = async (req, res) => {
  try {
    res.status(200).json({ message: "Token Verified" });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: err });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ where: { name: req.body.username } });

    if (!user || req.body.password !== user.password)
      throw "invalid_credentials";

    if (user.status == "disabled") throw "disabled";

    let result = await Setting.findOne({
      where: { id: 1 },
      attributes: ["allowed_ip"],
    });

    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (process.env.MODE !== "development") {
      if (!result.allowed_ip.split(",").includes(ip)) {
        console.error(ip);
        throw "invalid_ip";
      }
    }

    const token = jwt.sign({ username: user.name }, config.jwtSecret, {
      expiresIn: "12h",
    });

    return res.status(200).json({
      token: token,
      user: user.name,
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: err });
  }
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

module.exports = {
  login,
  verifyToken,
  requireSignin
};
