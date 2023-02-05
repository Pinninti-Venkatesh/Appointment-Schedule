const User = require("../models/user");
var jwt = require("jsonwebtoken");
const {expressjwt} = require("express-jwt");
require("dotenv").config();

exports.signup = (req, res) => {
  const user = req.body;
  User.create(user, (err, data) => {
    if (err) {
      return res.status(400).json({
        err: "unable save user in DB " + err,
      })
    }
    return res.status(200).json({
      username:data.username,
    });
  })
};

exports.signin = (req, res) => {
  const { username, password } = req.body;
  User.findOne(username, password, (err, data) => {
    if (err)
      res.status(500).send({
        err:
          err.message || "Some error occurred while getting locations."
      });
    else {
      const authToken = jwt.sign({ _id: data.username }, process.env.SECRET);
      res.cookie("token", authToken, { expire: new Date() + 9999 });
      const { username, email } = data;
      return res.json({
        authToken,
        user: { username, email },
      });
    }
  })
}


exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout successful",
  });
};

exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["sha1", "RS256", "HS256"],
  // algorithms: ['RS256']
});


