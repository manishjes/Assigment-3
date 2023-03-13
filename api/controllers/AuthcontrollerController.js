const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Sails } = require("sails");

const dotenv = require("dotenv").config();

module.exports = {

  // for signup user
  signup: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(401).json({ message: "emailAll ready exists" });
      }

      const hash = await bcrypt.hash(password, 10);
      const newuser = await User.create({ email, password: hash }).fetch();

      return res.json({
        success: true,
        message: "User created successfully ",
      });
    } catch (err) {
      return res.json({ success: false, message: err.message });
    }
  },
 // for login user
  login: async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid password");
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
      await User.updateOne({ _id: user.id}, { token: token });

      console.log("Token saved to user:", user.email);

      res.status(200).json({ message: "Auth successful", token: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
 // for logout user
  logout: async (req, res) => {
    try {
      console.log(req.userData);
      const userId = await req.userData.id;
      console.log(userId);
      const user = await User.findOne({ id: userId });
      // user.token = " ";
      await User.updateOne({ id:userId }, { token: "" });
      res.status(200).json({ message: "User log out successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
};
