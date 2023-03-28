const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
 

  try {
    const token = await req.headers.authorization.split(" ")[1];
    const decode = await sails.helpers.verifyToken.with({
        token: token,
      });
    const userData = await User.findOne(decode.id);
    if (userData.roles === "a") {
      return next();
    } else {
        return res.status(401).json({ message: "Auth failed" });;
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: 'Auth failed'
    })
  }
};