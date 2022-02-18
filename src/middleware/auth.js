const jwt = require("jsonwebtoken");
const User = require("../models/users");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", " ").trim();
    //enusre token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //the string is imp!
    // find user by id which have the auth token stored, and when user
    // loges out , we want to remove that token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
   
    // console.log(user);
    if (!user) {
      throw new Error();
    }
    req.token =token;
    //give the route handler access to the user we fetched
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({
      error: "please authenticate",
    });
  }
};

module.exports = auth;

// key: Authorizarion , value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA3MjJjZDVmN2UwYjYzYTE4YmI0ZjQiLCJpYXQiOjE2NDQ2MzQ4NDZ9.Yx_EPW70-XtuRLVY2_JRShgLRP0RzDtKzXv8u0--Des
