const jwt = require("jsonwebtoken");


module.exports = async (req, res, next) => {
  

  try {
    const token = await req.headers.authorization.split(" ")[1];
    //console.log(token);
    //verify token
    const decode = await sails.helpers.verifyToken.with({
      token: token,
    });
    
    req.userData = decode;
    const userData = await User.findOne(decode.id);
    if (!decode) {
      return res.status(401).json({ message: "token not match" });
    }

    if (userData.role === "u") {
      return next();
    } else {
      return res.status(401).json({ message: "Auth failed" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Auth failed" });
  }
};
  